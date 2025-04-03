import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TOTP() {
  const [secret, setSecret] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  // When the component mounts, request a TOTP secret and QR code from the backend.
  useEffect(() => {
    axios.get('http://localhost:5000/api/totp/setup')
      .then(res => {
        setSecret(res.data.secret);
        setQrCode(res.data.qrCode);
      })
      .catch(err => {
        console.error('Error generating TOTP secret:', err);
      });
  }, []);

  // Handle verifying the code the user enters
  const handleVerify = () => {
    axios.post('http://localhost:5000/api/totp/verify', {
      token: token,
      secret: secret,
    })
    .then(res => {
      setMessage('Token verified successfully!');
    })
    .catch(err => {
      setMessage('Invalid token. Please try again.');
    });
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Two-Factor Authentication Setup</h2>
      {qrCode ? (
        <div>
          <p>Scan this QR code with your authenticator app:</p>
          <img src={qrCode} alt="TOTP QR Code" style={{ width: '200px', height: '200px' }} />
          <p>Your secret: {secret}</p>
        </div>
      ) : (
        <p>Loading QR Code...</p>
      )}
      <div style={{ marginTop: '20px' }}>
        <input 
          type="text"
          placeholder="Enter code from app"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          style={{ padding: '10px', width: '200px' }}
        />
        <button onClick={handleVerify} style={{ padding: '10px', marginLeft: '10px' }}>
          Verify
        </button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
}

export default TOTP;
