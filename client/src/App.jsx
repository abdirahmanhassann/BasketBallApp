import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Header from './reusable/header';
import Footer from './reusable/Footer';
import HomePage from './DynamicPages/HomePage';
import SignIn from './DynamicPages/Signin';
import SignUp from './DynamicPages/Signup';
import LoggedInLandingPage from './DynamicPages/LoggedIn/loggedInLandingPage';
import { NavProvider } from './reusable/NavContext';
import ConfirmChoice from './DynamicPages/LoggedIn/subprofile/startgame/confirmchoice';
import StartGame from './DynamicPages/LoggedIn/subprofile/startgame/StartGame';
import Settings from './DynamicPages/LoggedIn/subprofile/settings';
import Profile from './DynamicPages/LoggedIn/subprofile/profile';
import Games from './DynamicPages/LoggedIn/Game';
import Playgame from './DynamicPages/LoggedIn/playgame';

function AuthChecker({ setIsAuthenticated }) {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refreshToken');

      if (!token) {
        console.log('No auth token found. Redirecting to signin...');
        setIsAuthenticated(false);
        navigate('/signin'); // ✅ Redirect now works inside Router
        return;
      }

      try {
        const res = await fetch('http://localhost:3000/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: localStorage.getItem('token'), refreshToken: localStorage.getItem('refreshToken'), appjs: true }), // Include the token and refresh token in the request body            
        })        

        if (res.status === 200) {
          console.log('Authenticated successfully.');
          setIsAuthenticated(true);
        } 
        else {
          console.log('Authentication failed. Redirecting to signin...');
          setIsAuthenticated(false);
          navigate('/signin'); 
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);
        navigate('/signin'); 
      }
    };

    checkAuth();
  }, [navigate, setIsAuthenticated]);

  return null; // ✅ This component only runs authentication logic
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavProvider>
      <Router>
        <AuthChecker setIsAuthenticated={setIsAuthenticated} /> {/* ✅ Authentication logic is now inside Router */}
        <Routes>
          <Route path="/" element={<HomePage /> } exact />
          <Route path="/signin" element={<SignIn />} exact />
          <Route path="/signup" element={<SignUp />} exact />
          <Route path="/home" element={ isAuthenticated?<LoggedInLandingPage /> : <SignIn />} exact />
          <Route path="/startgame" element={<StartGame />} exact />
          <Route path="/profile" element={<Profile />} exact />
          <Route path="/settings" element={<Settings />} exact />
          <Route path="/games" element={<Games />} exact />
          <Route path="/games/:id" element={<Playgame />} exact />
          <Route path="/confirm/:id" element={<ConfirmChoice />} />
        </Routes>
      </Router>
    </NavProvider>
  );
}

export default App;
