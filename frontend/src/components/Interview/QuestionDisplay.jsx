import React, { useEffect, useState } from 'react';
import { formatTime } from '../../utils/helpers';

const QuestionDisplay = ({ question, timeRemaining, questionNumber, totalQuestions }) => {
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(false);
  const audioRef = React.useRef(null);

  useEffect(() => {
    if (isAutoPlayEnabled && audioRef.current && question?.audioUrl) {
      audioRef.current.play();
    }
  }, [question, isAutoPlayEnabled]);

  return (
    <div className="question-display">
      <div className="question-header">
        <div className="question-counter">
          Question {questionNumber} of {totalQuestions}
        </div>
        <div className="time-remaining">
          ⏱️ {formatTime(timeRemaining)}
        </div>
      </div>

      <div className="question-content">
        <h2>{question?.text}</h2>

        {question?.audioUrl && (
          <div className="audio-controls">
            <audio
              ref={audioRef}
              src={question.audioUrl}
              className="question-audio"
            />
            <button
              onClick={() => audioRef.current?.play()}
              className="play-btn"
            >
              🔊 Play Question
            </button>
            <label className="autoplay-checkbox">
              <input
                type="checkbox"
                checked={isAutoPlayEnabled}
                onChange={(e) => setIsAutoPlayEnabled(e.target.checked)}
              />
              Auto-play audio
            </label>
          </div>
        )}

        <div className="question-info">
          <p>Time to answer: {question?.duration || 120} seconds</p>
        </div>
      </div>
    </div>
  );
};

export default QuestionDisplay;
