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
import Profile from './DynamicPages/LoggedIn/profile';
import { NavProvider } from './reusable/NavContext';

function App() {
const [isAuthenticated,setIsAuthenticated]=useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Optionally validate the token with the server
      setIsAuthenticated(true);
    }
  }, []);

  return (
   <NavProvider>
<Router>
   <Routes>

   <Route  path='/' element={<HomePage />}exact/>
   <Route  path='/signin' element={<SignIn />}exact/>
   <Route  path='/signup' element={<SignUp />}exact/>
      <Route  path='/profile' element={isAuthenticated? <Profile />: <SignIn/>} exact/>
</Routes>
</Router>
</NavProvider>

);
}

export default App;
