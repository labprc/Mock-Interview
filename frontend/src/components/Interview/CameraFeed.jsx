import React, { useEffect, useRef, useState } from 'react';
import cameraService from '../../services/cameraService';
import { OFF_FRAME_WARNING_LIMIT } from '../../utils/constants';

const CameraFeed = ({ onFrameCapture, warningCount, isRecording, onOutOfFrame }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState('');
  const [isModelLoading, setIsModelLoading] = useState(false);
  const stopMonitoringRef = useRef(null);

  useEffect(() => {
    const initCamera = async () => {
      try {
        const cameraStream = await cameraService.requestCameraAccess();
        setStream(cameraStream);
        if (videoRef.current) {
          videoRef.current.srcObject = cameraStream;
        }
      } catch (err) {
        setError(err.message);
      }
    };

    initCamera();

    return () => {
      if (stream) {
        cameraService.stopStream(stream);
      }
    };
  }, []);

  // Start face detection monitoring for the entire component lifecycle
  useEffect(() => {
    if (videoRef.current && !stopMonitoringRef.current) {
      setIsModelLoading(true);
      const startMonitoring = async () => {
        try {
          stopMonitoringRef.current = cameraService.startFaceDetectionMonitoring(
            videoRef.current,
            (isInFrame) => {
              if (!isInFrame) {
                onOutOfFrame?.('out-of-frame');
              }
            },
            3000 // Give relief: Check every 3 seconds to be much less strict
          );
          setIsModelLoading(false);
        } catch (err) {
          console.error('Face detection init error:', err);
          setIsModelLoading(false);
        }
      };
      // Wait slightly for video to init before starting
      setTimeout(startMonitoring, 2000);
    }

    // Add visibility listener to eliminate upon tab switch
    const handleVisibilityChange = () => {
      if (document.hidden) {
        onOutOfFrame?.('blur');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (stopMonitoringRef.current) {
        stopMonitoringRef.current();
        stopMonitoringRef.current = null;
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [onOutOfFrame]);

  return (
    <div className="camera-feed">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="video-element"
      />
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {error && <div className="camera-error">{error}</div>}
      {isModelLoading && <div className="camera-status">Loading face detection...</div>}

      <div className="camera-info">
        <div className={`warning-indicator ${warningCount > 0 ? 'warning' : ''}`}>
          ⚠️ Out of Frame: {warningCount}/{OFF_FRAME_WARNING_LIMIT}
        </div>
        {isRecording && <div className="recording-indicator">🔴 RECORDING</div>}
      </div>
    </div>
  );
};

export default CameraFeed;
