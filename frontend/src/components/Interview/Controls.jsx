import React from 'react';

const Controls = ({
  onStart,
  onStop,
  onNext,
  onSubmit,
  isRecording,
  canGoNext,
  isLastQuestion,
  isMicOn,
  onToggleMic
}) => {
  return (
    <div className="controls-panel">
      <div className="button-group">
        {!isRecording ? (
          <button
            onClick={onStart}
            className="control-btn start-btn"
            title="Start recording your answer"
          >
            ▶️ Start
          </button>
        ) : (
          <button
            onClick={onStop}
            className="control-btn stop-btn"
            title="Stop recording"
          >
            ⏹️ Stop
          </button>
        )}

        <button
          onClick={onToggleMic}
          className={`control-btn mic-btn ${isMicOn ? 'active' : 'muted'}`}
          title={isMicOn ? 'Mute microphone' : 'Unmute microphone'}
        >
          {isMicOn ? '🎤' : '🔇'} Mic
        </button>
      </div>

      <div className="button-group">
        <button
          onClick={onSubmit}
          className="control-btn submit-btn"
          title="Submit your answer"
        >
          ✓ Submit Answer
        </button>

        {!isLastQuestion && (
          <button
            onClick={onNext}
            disabled={!canGoNext}
            className="control-btn next-btn"
            title="Move to next question"
          >
            Next ➜
          </button>
        )}
      </div>
    </div>
  );
};

export default Controls;
