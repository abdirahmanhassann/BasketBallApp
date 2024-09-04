import React, { useContext } from 'react';
import { NavContext } from './NavContext'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom';

function SignedInHeader() {
  const { selectedNav, setSelectedNav } = useContext(NavContext);
const navigate =useNavigate()
  const handleNavClick = (navItem) => {
    setSelectedNav(navItem);
  };

  return (
    <nav style={{ background: '#d1002ae6' }} className='headerSignedIn'>
      <h1 style={{ color: 'white' }}>Basketball Addicts</h1>
      <nav className="nav">
        {['home', 'Games', 'Venues', 'Teams'].map((item) => (
          <div
            key={item}
            style={{ background: selectedNav === item ?  'rgba(207, 1, 43, 0.9)' : 'inherit' }}
            onClick={() => navigate(`/${item}`)}
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
