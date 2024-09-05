// App.jsx
import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './reusable/header';
import Footer from './reusable/Footer';
import GoogleButton from 'react-google-button'
import HomePage from './DynamicPages/HomePage';
import SignIn from './DynamicPages/Signin';
import {BrowserRouter as Router ,Route,Routes}from 'react-router-dom'
import SignUp from './DynamicPages/Signup';
import LoggedInLandingPage from './DynamicPages/LoggedIn/loggedInLandingPage';
import { NavProvider } from './reusable/NavContext';
import ConfirmChoice from './DynamicPages/LoggedIn/subprofile/startgame/confirmchoice';
import StartGame from './DynamicPages/LoggedIn/subprofile/startgame/StartGame';
import Settings from './DynamicPages/LoggedIn/subprofile/settings';
import Profile from './DynamicPages/LoggedIn/subprofile/profile';
import Games from './DynamicPages/LoggedIn/Game';
import Playgame from './DynamicPages/LoggedIn/playgame';

function App() {
const [isAuthenticated,setIsAuthenticated]=useState(false)

  useEffect(() => {
    fetch('http://localhost:3000/auth', {
      method: 'post', // Use the appropriate HTTP method here  
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: localStorage.getItem('token'),appjs:true }), // Include the token in the request body            
    }).then((res) => {
      res.json().then((data) => {
        if (!data.appjs) {
          setIsAuthenticated(false);
        } else {
          console.log('token has been found on auth')
          setIsAuthenticated(true);
        }
    })  
    })
    
  }, []);

  return (
   <NavProvider>
<Router>
   <Routes>

   <Route  path='/' element={<HomePage />}exact/>
   <Route  path='/signin' element={<SignIn />}exact/>
   <Route  path='/signup' element={<SignUp />}exact/>
      <Route path='/home' element={<LoggedInLandingPage />} exact/>
      <Route path='/startgame' element={<StartGame />} exact/>
      <Route path='/profile' element={<Profile />} exact/>
      <Route path='/settings' element={<Settings />} exact/>
      <Route path='/games' element={<Games/>} exact/>
      <Route path='/games/:id' element={<Playgame/>} exact/>
      <Route path='/confirm/:id' element={ <ConfirmChoice/>}/>
</Routes>
</Router>
</NavProvider>

);
}

export default App;
