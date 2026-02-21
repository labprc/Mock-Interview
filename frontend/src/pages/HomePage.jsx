import React from 'react';
import FieldSelector from '../components/Interview/FieldSelector';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="home-header">
        <h1 className="main-title">🎯 AI Interview Mock Test</h1>
        <p className="main-subtitle">Master your interview skills with AI-powered evaluation</p>
      </div>
      <FieldSelector />
    </div>
  );
};

export default HomePage;
