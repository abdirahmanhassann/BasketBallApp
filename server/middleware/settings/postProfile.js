const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const { pool,createUsersTable } = require('../../Db/db.js');



// POST endpoint to insert user data
async function postprofile( req, res) {
  const { username, email, gender, bio, phone, favoritePosition } = req.body.formData;
console.log('user is being posted:',username,email,gender,bio,phone,favoritePosition)
  try {
    const query = `
      UPDATE users 
      SET 
        gender = $1,
        bio = $2,
        phone = $3,
        favourite_position = $4,
        username = $6
      WHERE email = $5
      RETURNING *;
    `;
    const values = [gender, bio, phone, favoritePosition, email,username];

    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user information' });
  }
};

module.exports=postprofile;