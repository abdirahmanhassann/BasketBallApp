import React, { useState } from 'react';
import EditProfile from './subsettings/editProfile';
import Password from './subsettings/password';
import Email from './subsettings/email';
import SignedInHeader from '../../../reusable/SignedInHeader';
import Leftprofile from './leftprofile';


const Settings = () => {
  const [status,setStatus]=useState('Profile');
  const renderContent = () => {
    switch (status) {
      case 'Profile':
        return <EditProfile />;
      case 'Password':
        return <Password/>;
      case 'Email':
        return <Email/>;
      case 'Location':
        return null;
    }
  };
    return (
      <>
      <SignedInHeader />
      <div className='LargeDivider'>
        <Leftprofile />
      <div className="settings-container">
        <h2>Settings</h2>
        <div className="settings-tabs">
          <button
            className={status === 'Profile' ? 'active-tab' : ''}
            onClick={() => setStatus('Profile')}
          >
            Profile
          </button>
          <button
            className={status === 'Password' ? 'active-tab' : ''}
            onClick={() => setStatus('Password')}
          >
            Password
          </button>
          <button
            className={status === 'Email' ? 'active-tab' : ''}
            onClick={() => setStatus('Email')}
          >
            Email
          </button>
          <button
            className={status === 'Location' ? 'active-tab' : ''}
            onClick={() => setStatus('Location')}
          >
            Location
          </button>
        </div>
  
        <div className="settings-content">
          {renderContent()}
        </div>
        </div>
      </div>
      </>
    );
  };
  
  
export default Settings;
