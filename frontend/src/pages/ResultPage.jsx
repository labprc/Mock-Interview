import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ResultDisplay from '../components/Feedback/ResultDisplay';
import Loading from '../components/Common/Loading';
import interviewService from '../services/interviewService';

const ResultPage = () => {
  const { sessionId } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await interviewService.getSessionResults(sessionId);
        setResult(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch results');
        setLoading(false);
      }
    };

    fetchResults();
  }, [sessionId]);

  if (loading) return <Loading message="Loading your results..." />;
  if (error) return <div className="error-container">{error}</div>;
  if (!result) return <div className="error-container">No results found</div>;

  return (
    <div className="result-page">
      <ResultDisplay result={result} />
    </div>
  );
};

export default ResultPage;
