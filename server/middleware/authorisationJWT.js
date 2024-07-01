const express = require('express')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs');


const authenticateJWT = (req, res, next) => {
   console.log(req.cookies.token)
    const token = req.cookies.token;
    if (!token) {

      return res.status(401).send('Access denied. No token provided.');
    }

    try {
      // Verify and decode the token
      const decoded = jwt.verify(token, secretKey);
      req.user = decoded;
      next();
    } catch (err) {
      console.log(err)
      res.status(401).send('Invalid token');
    }
  };

  module.exports=authenticateJWT;