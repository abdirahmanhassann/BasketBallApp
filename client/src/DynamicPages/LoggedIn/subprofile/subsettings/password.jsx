import React, { useState } from 'react';

const Password = () => {
  // State for storing password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reNewPassword, setReNewPassword] = useState('');
  const [error, setError] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== reNewPassword) {
      setError('New passwords do not match');
      return;
    }

    // Handle the form submission logic here, e.g., API call

    // Clear the form
    setCurrentPassword('');
    setNewPassword('');
    setReNewPassword('');
    setError('');
  };

  return (
      <form onSubmit={handleSubmit} className="password-form">
        <div className="form-group">
          <label htmlFor="currentPassword">Current Password</label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="reNewPassword">Re-enter New Password</label>
          <input
            type="password"
            id="reNewPassword"
            value={reNewPassword}
            onChange={(e) => setReNewPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="error-text">{error}</p>}

        <button type="submit" className="submit-btn" style={{marginTop:'20px'}}>Submit</button>
      </form>

  );
};

export default Password;
