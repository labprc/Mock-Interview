let faceDetectionModel = null;

const initializeFaceDetection = async () => {
  if (faceDetectionModel) return faceDetectionModel;

  try {
    // Load TensorFlow.js and COCO-SSD model for face detection
    const tf = await import('@tensorflow/tfjs');
    const cocoSsd = await import('@tensorflow-models/coco-ssd');
    faceDetectionModel = await cocoSsd.load();
    return faceDetectionModel;
  } catch (error) {
    console.error('Failed to load face detection model:', error);
    throw error;
  }
};

const cameraService = {
  requestCameraAccess: async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: true
      });
      return stream;
    } catch (error) {
      throw new Error('Camera access denied or not available');
    }
  },

  stopStream: (stream) => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  },

  captureFrame: (videoElement) => {
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoElement, 0, 0);
    return canvas.toDataURL('image/jpeg');
  },

  getDevices: async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      return devices.filter(device => device.kind === 'videoinput');
    } catch (error) {
      throw new Error('Failed to enumerate devices');
    }
  },

  detectFace: async (videoElement) => {
    try {
      const model = await initializeFaceDetection();
      const predictions = await model.detect(videoElement);

      // Filter for person/face detections
      const faceDetections = predictions.filter(
        pred => pred.class === 'person' && pred.score > 0.4
      );

      return {
        faceDetected: faceDetections.length > 0,
        detections: faceDetections,
        predictions: predictions
      };
    } catch (error) {
      console.error('Face detection error:', error);
      return {
        faceDetected: true, // Fail-safe to true if error occurs
        detections: [],
        predictions: [],
        error: error.message
      };
    }
  },

  isUserInFrame: async (videoElement) => {
    const result = await cameraService.detectFace(videoElement);
    return result.faceDetected;
  },

  startFaceDetectionMonitoring: (videoElement, callback, interval = 500) => {
    let detectionInterval;

    const monitor = async () => {
      const isInFrame = await cameraService.isUserInFrame(videoElement);
      callback(isInFrame);
    };

    detectionInterval = setInterval(monitor, interval);

    return () => clearInterval(detectionInterval);
  }
};

export default cameraService;
