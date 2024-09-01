import React, { useContext, useState } from 'react';
import { NavContext } from '../../../../reusable/NavContext';

const Password = () => {
    const { userInfo,selectedNav, setSelectedNav } = useContext(NavContext);
    // State for storing password fields
   const[email,setEmail]=useState(userInfo.user.email)
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reNewPassword, setReNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const token=localStorage.getItem('token')

    // Function to handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Clear previous error/success messages
      setError('');
      setSuccess('');
  
      if (newPassword !== reNewPassword) {
        setError('New password and confirm password do not match');
        return;
      }
  
      try {
        // Sending current password and new password to the backend
        const response = await fetch('http://localhost:3000/settings/changepassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email:email, currentPassword:currentPassword,newPassword:newPassword,token:token }),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          setError(data.error || 'Failed to change password');
          return;
        }
  
        setSuccess('Password changed successfully');
        alert(data.message)
        setCurrentPassword('');
        setNewPassword('');
        setReNewPassword('');
        setConfirmPassword('');
      } catch (err) {

        console.error('Error changing password:', err);
        setError('An unexpected error occurred');
        alert(error)
      }
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
