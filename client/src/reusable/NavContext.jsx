import React, { createContext, useState } from 'react';

// Create Context
export const NavContext = createContext();

export const NavProvider = ({ children }) => {
  const [selectedNav, setSelectedNav] = useState('Home');

  return (
    <NavContext.Provider value={{ selectedNav, setSelectedNav }}>
      {children}
    </NavContext.Provider>
  );
};
