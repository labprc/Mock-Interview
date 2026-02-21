import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await authService.getProfile();
        setProfile(data?.user);
      } catch (e) {
        console.error("Failed to load profile for navbar");
      }
    };
    fetchProfileData();
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🎯</span>
          AI Interview
        </Link>

        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
          <li><Link to="/contact-us">Contact Us</Link></li>
          <li>
            <Link to="/profile" className="profile-link">
              <div className="profile-photo">
                {profile?.profileImage ? (
                  <img src={profile.profileImage} alt="Profile" />
                ) : (
                  (profile?.fullName || 'U').charAt(0).toUpperCase()
                )}
              </div>
              Profile
            </Link>
          </li>
          <li>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
