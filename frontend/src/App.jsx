import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import InterviewPage from './pages/InterviewPage';
import ResultPage from './pages/ResultPage';
import ProfilePage from './pages/ProfilePage';
import ContactUs from './pages/ContactUs';
import FAQ from './pages/FAQ';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Navbar from './components/Common/Navbar';
import './styles/App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      {isAuthenticated && <Navbar onLogout={handleLogout} />}
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/" /> : <Login onLoginSuccess={handleLogin} />
          }
        />
        <Route
          path="/signup"
          element={
            isAuthenticated ? <Navigate to="/" /> : <Signup onSignupSuccess={handleLogin} />
          }
        />
        <Route
          path="/"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/interview/:fieldId"
          element={isAuthenticated ? <InterviewPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/results/:sessionId"
          element={isAuthenticated ? <ResultPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/contact-us"
          element={isAuthenticated ? <ContactUs /> : <Navigate to="/login" />}
        />
        <Route
          path="/faq"
          element={isAuthenticated ? <FAQ /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
