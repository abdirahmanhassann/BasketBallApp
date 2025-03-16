// server/middleware/getUserUpcomingMatches.js

const { pool } = require('../Db/db');
const jwt=require('jsonwebtoken')

const getUserUpcomingMatches = async (req, res, next) => {
  const { email } = req.body;
  const newemail=  jwt.verify(email, process.env.SECRET_KEY);
console.log('email in getUserUpcomingMatches:',newemail.email)
  try {
    const query = `
    SELECT g.*
    FROM games g
    WHERE g.start_time > NOW() 
    AND (
        g.owner_id = (SELECT id FROM users WHERE email = $1) 
        OR EXISTS (
            SELECT 1 FROM unnest(g.applicants) as app WHERE app = (SELECT id FROM users WHERE email = $1)
        )
    )
    ORDER BY g.start_time ASC
  `;
        const values = [newemail.email];
    const result = await pool.query(query, values);
    console.log('result.rows:',result.rows)
    req.upcomingMatches = result.rows;
    res.status(200).json(req.upcomingMatches);
  } catch (error) {
    console.error('Error fetching upcoming matches:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = getUserUpcomingMatches;