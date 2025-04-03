import React, { useState } from 'react';
import axios from 'axios';
import LogIn from './components/log-in/log-in'; // Import the LogIn component
import TOTP from './components/totp/totp'; // Import the TOTP component


function App() {
  // Tracks if the user is authenticated (username/password correct)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // New state: Tracks if the user has successfully verified the TOTP code
  const [isTOTPVerified, setIsTOTPVerified] = useState(false);

  // Login form fields
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  // Error message if credentials are incorrect
  const [loginError, setLoginError] = useState('');

  // Update the login form state as the user types
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
  };

// Send login credentials to the backend for authentication
const handleLoginSubmit = (e) => {
  e.preventDefault();
  axios.post('http://localhost:5000/api/accounts/login', loginForm)
    .then((res) => {
      // If login is successful, update authentication state
      setIsAuthenticated(true);
      setLoginError('');
    })
    .catch((err) => {
      setLoginError('Invalid username or password');
    });
};

  // If not authenticated, render the login screen
  if (!isAuthenticated) {
    return (
      <LogIn
        loginForm={loginForm}
        onChange={handleLoginChange}
        onSubmit={handleLoginSubmit}
        loginError={loginError}
      />
    );
  }

  if (!isTOTPVerified) {
    return <TOTP onVerified={() => setIsTOTPVerified(true)} />;
  }

  // If authenticated, show a simple welcome
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Welcome, you are logged in!</h2>
    </div>
  );
}

export default App;
