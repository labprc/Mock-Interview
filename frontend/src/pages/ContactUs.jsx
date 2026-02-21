import React, { useState } from 'react';

const ContactUs = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.email && formData.message) {
            setSubmitted(true);
            setFormData({ name: '', email: '', message: '' });
        }
    };

    return (
        <div className="contact-page" style={{ padding: '2rem', minHeight: 'calc(100vh - 80px)', background: 'white' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto', background: '#f8f9fa', padding: '2rem', borderRadius: '10px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
                <h1 style={{ marginBottom: '1rem', color: '#333' }}>Contact Us</h1>
                <p style={{ color: '#666', marginBottom: '2rem' }}>We would love to hear from you. Please fill out the form below to get in touch with our team.</p>

                {submitted ? (
                    <div style={{ padding: '1.5rem', background: '#e8f5e9', color: '#2e7d32', borderRadius: '5px', textAlign: 'center' }}>
                        <strong>Thank you for reaching out!</strong><br />We have received your message and will respond shortly.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>Your Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '5px', border: '1px solid #ddd' }}
                                required
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>Your Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '5px', border: '1px solid #ddd' }}
                                required
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>Message</label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '5px', border: '1px solid #ddd', minHeight: '120px', fontFamily: 'inherit' }}
                                required
                            />
                        </div>
                        <button type="submit" style={{ padding: '1rem', background: '#667eea', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s' }}>
                            Send Message
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ContactUs;
