import React, { createContext, useState } from 'react';

// Create Context
export const NavContext = createContext();

export const NavProvider = ({ children }) => {
  const [selectedNav, setSelectedNav] = useState('Home');
  const [userInfo, setUserInfo] = useState(null);

  return (
    <NavContext.Provider value={{ selectedNav, setSelectedNav, userInfo, setUserInfo }}>
      {children}
    </NavContext.Provider>
  );
}