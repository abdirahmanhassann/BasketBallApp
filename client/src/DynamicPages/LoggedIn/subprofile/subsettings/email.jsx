import React, { useContext, useState } from 'react';
import { NavContext } from '../../../../reusable/NavContext';

const Email = () => {
    const { userInfo,selectedNav, setSelectedNav } = useContext(NavContext);
  // State for storing password fields
 const[email,setEmail]=useState(userInfo.user.email)
  const [currentPassword, setCurrentPassword] = useState('');
  const [error, setError] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    setCurrentPassword('');
    setEmail('');
    setError('');
  };

  return (
      <form onSubmit={handleSubmit} className="email-form">
        <div className="form-group">
          <label htmlFor="currentPassword">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{color:'#565656'}}
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

        <button type="submit" className="submit-btn" style={{marginTop:'20px'}}>Submit</button>
      </form>

  );
};

export default Email;
