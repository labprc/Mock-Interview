import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { INTERVIEW_FIELDS } from '../../utils/constants';

const FieldSelector = () => {
  const navigate = useNavigate();
  const [fields] = useState(INTERVIEW_FIELDS);
  const [selectedField, setSelectedField] = useState(null);

  const handleStartInterview = (fieldId) => {
    setSelectedField(fieldId);
    navigate(`/interview/${fieldId}`);
  };

  return (
    <div className="field-selector">
      <div className="field-header">
        <h1>Select Your Interview Field</h1>
        <p>Choose a domain to start your interview</p>
      </div>

      <div className="field-grid">
        {fields.map(field => (
          <div 
            key={field.id} 
            className={`field-card ${selectedField === field.id ? 'selected' : ''}`}
            style={{ borderColor: field.color }}
          >
            <div className="field-icon" style={{ backgroundColor: field.color }}>
              {field.icon}
            </div>
            <h3>{field.name}</h3>
            <button
              onClick={() => handleStartInterview(field.id)}
              className="start-btn"
              style={{ backgroundColor: field.color }}
            >
              Start Interview
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FieldSelector;
