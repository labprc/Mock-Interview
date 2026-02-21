export const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

export const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const getJWTToken = () => {
  return localStorage.getItem('token');
};

export const setJWTToken = (token) => {
  localStorage.setItem('token', token);
};

export const removeJWTToken = () => {
  localStorage.removeItem('token');
};

export const getUserId = () => {
  return localStorage.getItem('userId');
};

export const setUserId = (userId) => {
  localStorage.setItem('userId', userId);
};

export const calculatePercentage = (marks, totalMarks) => {
  if (totalMarks === 0) return 0;
  return Math.round((marks / totalMarks) * 100);
};

export const getGradeFromPercentage = (percentage) => {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B';
  if (percentage >= 60) return 'C';
  if (percentage >= 50) return 'D';
  return 'F';
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
