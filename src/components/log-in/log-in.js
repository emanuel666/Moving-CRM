// src/components/LoginForm/LoginForm.js
import React from 'react';
import './log-in.css';

// This component displays a login form. It receives the current login values,
// a change handler, a submit handler, and any error messages as props.
function LoginForm({ loginForm, onChange, onSubmit, loginError }) {
  return (
    <div className="login-container">
      <h2>Login</h2>
      {loginError && <p className="error-text">{loginError}</p>}
      <form onSubmit={onSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={loginForm.username}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginForm.password}
            onChange={onChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
