import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CameraFeed from './CameraFeed';
import QuestionDisplay from './QuestionDisplay';
import Controls from './Controls';
import Loading from '../Common/Loading';
import { OFF_FRAME_WARNING_LIMIT } from '../../utils/constants';
import interviewService from '../../services/interviewService';
import speechService from '../../services/speechService';

const InterviewRoom = () => {
  const { fieldId } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [warningCount, setWarningCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(120);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [isEliminated, setIsEliminated] = useState(false);
  const recognitionRef = useRef(null);
  const timerRef = useRef(null);

  // Request camera and microphone permissions
  useEffect(() => {
    const requestPermissions = async () => {
      try {
        // Request camera permission
        const cameraStream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false
        });

        // Request microphone permission
        const audioStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false
        });

        // Stop the streams (they're just for permission request)
        cameraStream.getTracks().forEach(track => track.stop());
        audioStream.getTracks().forEach(track => track.stop());

        setPermissionsGranted(true);
      } catch (err) {
        console.error('Permission error:', err);
        if (err.name === 'NotAllowedError') {
          setError('Camera and/or Microphone permission denied. Please allow access to continue.');
        } else if (err.name === 'NotFoundError') {
          setError('Camera and/or Microphone not found on your device.');
        } else {
          setError('Failed to access camera and microphone: ' + err.message);
        }
        setLoading(false);
      }
    };

    requestPermissions();
  }, []);

  // Initialize interview session
  useEffect(() => {
    if (!permissionsGranted) return;

    const initSession = async () => {
      try {
        const sessionData = await interviewService.startSession(fieldId);
        setSession(sessionData);

        const questionsData = await interviewService.getQuestions(fieldId);
        setQuestions(questionsData.questions || []);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to initialize interview');
        setLoading(false);
      }
    };

    initSession();
  }, [fieldId, permissionsGranted]);

  const handleOutOfFrame = (reason = 'out-of-frame') => {
    setWarningCount(prev => {
      const newCount = prev + 1;
      if (newCount >= OFF_FRAME_WARNING_LIMIT) {
        // User eliminated
        handleStopRecording();
        setIsEliminated(true);

        // Play an aggressive silencer/error noise
        try {
          const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          const oscillator = audioCtx.createOscillator();
          const gainNode = audioCtx.createGain();

          oscillator.type = 'sawtooth';
          oscillator.frequency.setValueAtTime(150, audioCtx.currentTime); // Low harsh tone
          oscillator.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 1);

          gainNode.gain.setValueAtTime(1, audioCtx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.5);

          oscillator.connect(gainNode);
          gainNode.connect(audioCtx.destination);

          oscillator.start();
          oscillator.stop(audioCtx.currentTime + 2);
        } catch (e) { console.error("Could not play buzzer", e); }

        // Mark as abandoned in backend
        if (session?.sessionId) {
          interviewService.abandonSession(session.sessionId).catch(console.error);
        }

        setTimeout(() => {
          navigate('/');
        }, 5000);
      } else {
        // Show warning but continue
        alert(`WARNING (${newCount}/${OFF_FRAME_WARNING_LIMIT}): You left the ${reason === 'blur' ? 'interview tab/window' : 'camera frame'}!`);
      }
      return newCount;
    });
  };

  // Timer effect for interview countdown
  useEffect(() => {
    if (isRecording && timeRemaining > 0) {
      timerRef.current = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isRecording) {
      handleStopRecording();
    }

    return () => clearTimeout(timerRef.current);
  }, [isRecording, timeRemaining]);

  const handleStartRecording = () => {
    setIsRecording(true);
    setTimeRemaining(120);

    if (!speechService.isSupported()) {
      setError('Speech recognition not supported in your browser');
      return;
    }

    recognitionRef.current = speechService.startListening(
      (result) => {
        setAnswers(prev => ({
          ...prev,
          [currentQuestionIndex]: (result.final || result.interim)
        }));
      },
      (error) => {
        setError(error.message);
      },
      () => {
        // Finished
      }
    );
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    if (recognitionRef.current) {
      speechService.stopListening(recognitionRef.current);
    }
  };

  const handleSubmitAnswer = async () => {
    try {
      const answer = answers[currentQuestionIndex] || '';
      const timeSpent = 120 - timeRemaining;

      await interviewService.submitAnswer(
        session.sessionId,
        questions[currentQuestionIndex]?.id,
        answer,
        timeSpent
      );

      if (currentQuestionIndex === questions.length - 1) {
        // Last question - end session
        await interviewService.endSession(session.sessionId);
        navigate(`/results/${session.sessionId}`);
      } else {
        handleNextQuestion();
      }
    } catch (err) {
      setError(err.message || 'Failed to submit answer');
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeRemaining(120);
      setIsRecording(false);
    }
  };

  if (loading) return <Loading message="Initializing interview..." />;
  if (error) return <div className="error-container">{error}</div>;
  if (!session || questions.length === 0) return <Loading />;

  if (isEliminated) return (
    <div style={{
      height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      background: '#fff0f0', animation: 'flashBackground 1s infinite', position: 'fixed', top: 0, left: 0,
      width: '100%', zIndex: 9999
    }}>
      <style>{`
        @keyframes flashBackground {
          0% { background-color: #ffe0e0; border: 20px solid red; }
          50% { background-color: #ffcccc; border: 20px solid darkred; }
          100% { background-color: #ffe0e0; border: 20px solid red; }
        }
      `}</style>
      <div style={{ padding: '3rem', background: 'white', borderRadius: '15px', textAlign: 'center', boxShadow: '0 10px 30px rgba(255,0,0,0.5)', maxWidth: '600px' }}>
        <h1 style={{ color: '#d32f2f', fontSize: '4.5rem', marginBottom: '1rem', textTransform: 'uppercase', fontWeight: 900 }}>
          🚩 TERMINATED 🚩
        </h1>
        <p style={{ fontSize: '1.8rem', color: '#333', fontWeight: 'bold' }}>
          🚨 You have been eliminated due to 3 policy violations (Tab switching or Camera exit).
        </p>
        <p style={{ fontSize: '1.2rem', color: '#666', marginTop: '2rem' }}>All scores voided. Redirecting to home...</p>
      </div>
    </div>
  );

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="interview-room">
      <div className="interview-layout">
        <div className="camera-section">
          <CameraFeed
            warningCount={warningCount}
            isRecording={isRecording}
            onOutOfFrame={handleOutOfFrame}
          />
        </div>

        <div className="question-section">
          <QuestionDisplay
            question={currentQuestion}
            timeRemaining={timeRemaining}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
          />

          <div className="live-transcript">
            <h3>Live Transcript:</h3>
            <p>
              {answers[currentQuestionIndex] ? answers[currentQuestionIndex] : "Waiting for you to speak..."}
            </p>
          </div>
        </div>
      </div>

      <div className="controls-section">
        <Controls
          onStart={handleStartRecording}
          onStop={handleStopRecording}
          onNext={handleNextQuestion}
          onSubmit={handleSubmitAnswer}
          isRecording={isRecording}
          canGoNext={true}
          isLastQuestion={currentQuestionIndex === questions.length - 1}
          isMicOn={isMicOn}
          onToggleMic={() => setIsMicOn(!isMicOn)}
        />
      </div>
    </div>
  );
};

export default InterviewRoom;
