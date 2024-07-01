// App.jsx
import React from 'react';
import './App.css';
import Header from './reusable/header';
import Footer from './reusable/Footer';
import GoogleButton from 'react-google-button'
import HomePage from './DynamicPages/HomePage';
import SignIn from './DynamicPages/Signin';
import {BrowserRouter as Router ,Route,Routes}from 'react-router-dom'

function App() {
  return (
<Router>
   <Routes>
   <Route  path='/' element={<HomePage />}exact/>
   <Route  path='/signin' element={<SignIn />}exact/>
</Routes>
</Router>

);
}

export default App;
