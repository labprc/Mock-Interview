import React, { useState } from 'react';

const FAQ = () => {
    const faqs = [
        {
            question: "What is AI Interview Mock Test?",
            answer: "A cutting-edge platform designed to help candidates prepare for real-world interviews using simulated AI evaluators and camera tracking technology."
        },
        {
            question: "How does the AI grade my answers?",
            answer: "The AI evaluates your verbal responses alongside industry standards. It uses an integrated model to estimate the accuracy and technical depth of the words you spoke."
        },
        {
            question: "Is there a limit to how many mock interviews I can take?",
            answer: "No! As long as you have an active account, you can take unlimited interviews to continually test and raise your skill ceiling."
        },
        {
            question: "What happens if I change tabs or leave the camera frame?",
            answer: "Our anti-cheating system uses advanced browser blurring APIs and face-detection framing. You have a shared limit of 3 warnings before the session terminates."
        }
    ];

    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <div className="faq-page" style={{ padding: '2rem', minHeight: 'calc(100vh - 80px)', background: 'white' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', background: '#f8f9fa', padding: '2rem', borderRadius: '10px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
                <h1 style={{ marginBottom: '1rem', color: '#333', textAlign: 'center' }}>Frequently Asked Questions</h1>
                <p style={{ color: '#666', marginBottom: '2rem', textAlign: 'center' }}>Find answers to common questions about using our platform.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            style={{ padding: '1.5rem', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', cursor: 'pointer' }}
                            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 style={{ margin: 0, color: '#444' }}>{faq.question}</h3>
                                <span style={{ fontSize: '1.5rem', color: '#667eea', fontWeight: 'bold' }}>
                                    {activeIndex === index ? '-' : '+'}
                                </span>
                            </div>
                            {activeIndex === index && (
                                <p style={{ marginTop: '1rem', color: '#666', lineHeight: '1.5' }}>
                                    {faq.answer}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
