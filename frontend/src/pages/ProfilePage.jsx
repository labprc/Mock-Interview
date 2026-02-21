import React, { useEffect, useState } from 'react';
import authService from '../services/authService';
import Loading from '../components/Common/Loading';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await authService.getProfile();
        setProfile(data);
        setFormData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch profile');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const updated = await authService.updateProfile(formData);
      setProfile({ ...profile, user: updated.user }); // Keep results intact
      setEditMode(false);
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    }
  };

  if (loading) return <Loading />;

  const chartData = profile?.results ? [...profile.results].reverse().map((res, index) => ({
    name: `Test ${index + 1}`,
    marks: res.marksObtained,
    date: new Date(res.createdAt).toLocaleDateString()
  })) : [];

  return (
    <div className="profile-page" style={{ overflowY: 'auto' }}>
      <div className="profile-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
        <h1>My Profile</h1>

        {error && <div className="error-message">{error}</div>}

        <div className="profile-form">
          <div className="profile-image-section" style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div
              style={{
                width: '120px', height: '120px', borderRadius: '50%', backgroundColor: '#667eea',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
                fontSize: '48px', margin: '0 auto 10px', overflow: 'hidden', border: '4px solid #fff',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
              }}
            >
              {formData.profileImage ? (
                <img src={formData.profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                (formData.fullName || 'U').charAt(0).toUpperCase()
              )}
            </div>
            {editMode && (
              <div>
                <label className="edit-btn" style={{ cursor: 'pointer', padding: '0.5rem 1rem', display: 'inline-block' }}>
                  Upload Photo
                  <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                </label>
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={formData.fullName || ''}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  readOnly={!editMode}
                  onClick={() => !editMode && setEditMode(true)}
                  style={{ cursor: !editMode ? 'pointer' : 'text', background: !editMode ? '#f9f9f9' : '#fff' }}
                  title={!editMode ? "Click to edit" : ""}
                />
              </div>

              <div className="form-group" style={{ marginTop: '1rem' }}>
                <label>Email (Cannot be changed)</label>
                <input
                  type="email"
                  value={formData.email || ''}
                  disabled
                  style={{ background: '#eee' }}
                />
              </div>

              <div className="form-group" style={{ marginTop: '1rem' }}>
                <label>Phone</label>
                <input
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  readOnly={!editMode}
                  onClick={() => !editMode && setEditMode(true)}
                  style={{ cursor: !editMode ? 'pointer' : 'text', background: !editMode ? '#f9f9f9' : '#fff' }}
                  title={!editMode ? "Click to edit" : ""}
                />
              </div>

              <div className="form-actions" style={{ marginTop: '2rem' }}>
                {!editMode ? (
                  <button onClick={() => setEditMode(true)} className="edit-btn">
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button onClick={handleSave} className="save-btn">
                      Save Changes
                    </button>
                    <button onClick={() => {
                      setEditMode(false);
                      setFormData(profile?.user || {});
                    }} className="cancel-btn">
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="profile-results" style={{ borderLeft: '1px solid #eee', paddingLeft: '2rem' }}>
              <h3>Interview History</h3>
              {(!profile?.results || profile.results.length === 0) ? (
                <p style={{ color: '#666', marginTop: '1rem' }}>No interview results found.</p>
              ) : (
                <div style={{ marginTop: '1rem', maxHeight: '300px', overflowY: 'auto' }}>
                  {profile.results.map((res, index) => (
                    <div key={res._id || index} style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '5px', marginBottom: '1rem' }}>
                      <h4 style={{ color: '#333' }}>Total Marks: <span style={{ color: '#4CAF50' }}>{res.marksObtained}/{res.totalMarks}</span></h4>
                      <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>Correct Answers: {res.correctAnswers}/{res.totalQuestions}</p>
                      <p style={{ fontSize: '0.8rem', color: '#999', marginTop: '0.5rem' }}>
                        Date: {new Date(res.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Performance Graph Section */}
          {chartData.length > 0 && (
            <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #eee' }}>
              <h3>Performance Assessment Graph</h3>
              <p style={{ color: '#666', marginBottom: '1.5rem' }}>Visual representation of your interview scores over time.</p>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="marks" stroke="#667eea" strokeWidth={3} activeDot={{ r: 8 }} />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
