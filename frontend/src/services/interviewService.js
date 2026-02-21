import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const interviewService = {
  startSession: async (fieldId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/interview/start`,
        { fieldId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to start interview' };
    }
  },

  getQuestions: async (fieldId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/interview/questions/${fieldId}`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch questions' };
    }
  },

  submitAnswer: async (sessionId, questionId, answer, timeSpent) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/interview/answer`,
        { sessionId, questionId, answer, timeSpent },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to submit answer' };
    }
  },

  endSession: async (sessionId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/interview/end`,
        { sessionId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to end session' };
    }
  },

  abandonSession: async (sessionId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/interview/abandon`,
        { sessionId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to abandon session' };
    }
  },

  getSessionResults: async (sessionId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/interview/results/${sessionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch results' };
    }
  }
};

export default interviewService;
