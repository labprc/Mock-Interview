import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const apiService = {
  setAuthToken: (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  },

  get: async (url, config = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}${url}`, config);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Request failed' };
    }
  },

  post: async (url, data, config = {}) => {
    try {
      const response = await axios.post(`${API_BASE_URL}${url}`, data, config);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Request failed' };
    }
  },

  put: async (url, data, config = {}) => {
    try {
      const response = await axios.put(`${API_BASE_URL}${url}`, data, config);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Request failed' };
    }
  },

  delete: async (url, config = {}) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}${url}`, config);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Request failed' };
    }
  }
};

// Initialize auth token on app load
const token = localStorage.getItem('token');
if (token) {
  apiService.setAuthToken(token);
}

export default apiService;
