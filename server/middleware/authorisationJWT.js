const express = require('express')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs');
const dotenv=require('dotenv')
dotenv.config(); 

const authenticateJWT = (req, res, next) => {
  const token = req.body.token;
console.log('token is:',token)
  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  
  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    console.log('verified: ',verified)
    req.user = verified;
    next();
  } catch (error) {
    console.log('error in the token')
    res.status(400).json({ message: 'Invalid Token' });
  }
};

  module.exports=authenticateJWT;