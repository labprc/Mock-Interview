export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

export const INTERVIEW_FIELDS = [
  {
    id: 1,
    name: 'Software Development',
    icon: '💻',
    color: '#FF6B6B'
  },
  {
    id: 2,
    name: 'Data Science',
    icon: '📊',
    color: '#4ECDC4'
  },
  {
    id: 3,
    name: 'DevOps',
    icon: '⚙️',
    color: '#45B7D1'
  },
  {
    id: 4,
    name: 'Machine Learning',
    icon: '🤖',
    color: '#FFA07A'
  },
  {
    id: 5,
    name: 'Cloud Architecture',
    icon: '☁️',
    color: '#98D8C8'
  }
];

export const OFF_FRAME_WARNING_LIMIT = 3;
export const RECORDING_TIME_LIMIT = 300; // 5 minutes in seconds
export const QUESTION_DURATION = 30; // Question display duration in seconds

export const FACE_DETECTION_MODEL = {
  modelPath: '/@tensorflow-models/coco-ssd',
  minConfidence: 0.5
};

export const SPEECH_RECOGNITION_LANG = 'en-US';

export const API_KEYS = {
  OPENAI: process.env.REACT_APP_OPENAI_API_KEY,
  GOOGLE_CLOUD: process.env.REACT_APP_GOOGLE_CLOUD_KEY,
  AZURE: process.env.REACT_APP_AZURE_KEY
};
