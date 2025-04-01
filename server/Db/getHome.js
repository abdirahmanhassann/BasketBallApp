const express=require('express')
const { pool } = require('./db');
const jwt= require('jsonwebtoken')
const dotenv=require('dotenv');
const router= express.Router()

router.post('/', async function (req, res, next) {
    const {email}=req.body;
    try {
        console.log('email for home: ',email)
        const verified = jwt.verify(email, process.env.SECRET_KEY);
        console.log('verified for home: ',verified.email)
        
        let query = `
                SELECT  email, username, firstname, lastname
                FROM users
                WHERE email = $1;
                `;
                const result = await pool.query(query, [verified.email]);

                if (result.rows.length > 0) {
                    console.log('res rows:', result.rows[0]);
                    return res.json({user:result.rows[0]}); // Return user details including name
                } else {
                    return res.status(404).json({ message: 'User does not exist' }); // User does not exist
                }
        
      } catch (error) {
        console.log('error in the token')
        res.status(400).json({ message: 'Invalid Token' });
      }
});

module.exports=router;