import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResultDisplay = ({ result }) => {
  const navigate = useNavigate();
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [userFeedback, setUserFeedback] = useState('');

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (userFeedback.trim()) {
      setFeedbackSubmitted(true);
      // Actual submission logic could go here
    }
  };

  return (
    <div className="result-display">
      <div className="result-header">
        <h1>Interview Results</h1>
        <p>Your performance analysis</p>
      </div>

      <div className="result-score" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ fontSize: '1.2rem', color: '#666', marginBottom: '1rem' }}>Overall Marks</div>
        <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#667eea' }}>
          {result?.marksObtained} / {result?.totalMarks}
        </div>
      </div>

      <div className="result-details">
        <h3>Performance Breakdown</h3>
        <div className="detail-item">
          <span>Total Questions</span>
          <strong>{result?.totalQuestions}</strong>
        </div>
        <div className="detail-item">
          <span>Correct Answers</span>
          <strong>{result?.correctAnswers}</strong>
        </div>
        <div className="detail-item">
          <span>Partial Answers</span>
          <strong>{result?.partialAnswers}</strong>
        </div>
      </div>

      <div className="result-feedback">
        <h3>AI Feedback</h3>
        <p>{result?.feedback || 'Great effort! Keep practicing to improve your score.'}</p>
      </div>

      {result?.evaluationDetails?.length > 0 && (
        <div className="result-details" style={{ marginTop: '2rem' }}>
          <h3>Detailed Evaluation</h3>
          {result.evaluationDetails.map((detail, index) => (
            <div key={index} style={{ marginBottom: '1.5rem', padding: '1rem', background: '#f5f5f5', borderRadius: '5px' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Question ID: {detail.questionId}</div>
              <div style={{ marginBottom: '0.5rem', color: '#444' }}><strong>Your Answer:</strong> {detail.userAnswer}</div>
              <div style={{ marginBottom: '0.5rem' }}><strong>Marks:</strong> <span style={{ color: '#4CAF50' }}>{detail.marks}/10</span></div>
              <div style={{ color: '#666' }}><strong>Feedback:</strong> {detail.feedback}</div>
            </div>
          ))}
        </div>
      )}

      <div className="user-feedback-section" style={{ marginTop: '3rem', padding: '2rem', background: '#f0f4ff', borderRadius: '10px' }}>
        <h3>Have Feedback on Your Interview?</h3>
        {!feedbackSubmitted ? (
          <form onSubmit={handleFeedbackSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <textarea
              placeholder="Tell us what you thought about the AI and the interview flow..."
              value={userFeedback}
              onChange={(e) => setUserFeedback(e.target.value)}
              style={{ padding: '1rem', borderRadius: '5px', border: '1px solid #c3d4ff', minHeight: '100px', fontFamily: 'inherit' }}
            />
            <button type="submit" className="save-btn" style={{ background: '#667eea', alignSelf: 'flex-start' }}>Submit Feedback</button>
          </form>
        ) : (
          <div style={{ color: '#4CAF50', marginTop: '1rem', fontWeight: 'bold' }}>
            Thank you for your feedback! It helps us improve the experience.
          </div>
        )}
      </div>

      <div className="result-actions" style={{ marginTop: '2rem' }}>
        <button
          onClick={() => navigate('/')}
          className="result-btn home-btn"
        >
          Go Home
        </button>
        <button
          onClick={() => window.location.href = '/'}
          className="result-btn retry-btn"
        >
          Try Another Interview
        </button>
      </div>
    </div>
  );
};

export default ResultDisplay;
