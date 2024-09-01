import React, { useContext, useState } from 'react';
import { NavContext } from '../../../../reusable/NavContext';

const UpdateEmail = () => {
  const { userInfo,setUserInfo } = useContext(NavContext);
  const [email, setEmail] = useState(userInfo.user.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const token=localStorage.getItem('token')

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error/success messages
    setError('');
    setSuccess('');

    try {
      // Sending current email, new email, and password to the backend
      const response = await fetch('http://localhost:3000/settings/changeemail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentEmail: userInfo.user.email, newEmail: email, currentPassword,token:token }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to change email');
        return;
      }

      setSuccess('Email changed successfully');
      setCurrentPassword('');
      setUserInfo(data);
      console.log('user info:',data.userInfo)
      localStorage.setItem('token', data.token);

      alert(data.message)
    } catch (err) {
        console.error('Error changing email:', err);
        setError('An unexpected error occurred');
        alert(error,err)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="email-form">
      <div className="form-group">
        <label htmlFor="email">New Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ color: '#565656' }}
        />
      </div>

      <div className="form-group">
        <label htmlFor="currentPassword">Password</label>
        <input
          type="password"
          id="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
      </div>

      {error && <p className="error-text">{error}</p>}
      {success && <p className="success-text">{success}</p>}

      <button type="submit" className="submit-btn" style={{ marginTop: '20px' }}>Submit</button>
    </form>
  );
};

export default UpdateEmail;
