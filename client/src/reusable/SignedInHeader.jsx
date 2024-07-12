import React, { useContext } from 'react';
import { NavContext } from './NavContext'; // Adjust the import path as needed

function SignedInHeader() {
  const { selectedNav, setSelectedNav } = useContext(NavContext);

  const handleNavClick = (navItem) => {
    setSelectedNav(navItem);
  };

  return (
    <nav style={{ background: '#d1002ae6' }} className='headerSignedIn'>
      <h1 style={{ color: 'white' }}>Basketball Addicts</h1>
      <nav className="nav">
        {['Home', 'Games', 'Venues', 'Teams'].map((item) => (
          <div
            key={item}
            style={{ background: selectedNav === item ?  'rgba(207, 1, 43, 0.9)' : 'inherit' }}
            onClick={() => handleNavClick(item)}
            className='navdivs'
          >
            {item}
          </div>
        ))}
      </nav>
      <div className='buttonDiv'>
        <p style={{ color: 'white' }}>Player Name & Icon</p>
      </div>
    </nav>
  );
}

export default SignedInHeader;
