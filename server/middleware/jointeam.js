const express = require('express');
const router = express.Router();
const { pool } = require('../Db/db');
const authenticateJWT = require('./authorisationJWT.js');

// Route to join a team
async function jointeam (req, res, next)   {
    const { gameId, teamIndex } = req.body;
    const userEmail = req.user.email;
    console.log('User email:', req.body);
    try {
        // Get user ID from email
        const userQuery = 'SELECT id, bio, email, gender, lastname, username, firstname, favourite_position FROM users WHERE email = $1';
        const userResult = await pool.query(userQuery, [userEmail]);
        console.log('User result:', userResult.rows);
        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userId = userResult.rows[0].id;
        const userName = userResult.rows[0].username;
console.log(gameId)
        // Get game details
        const gameQuery = 'SELECT * from games WHERE id = $1';
        const gameResult = await pool.query(gameQuery, [gameId]);
        if (gameResult.rows.length === 0) {
            return res.status(404).json({ message: 'Game not found' });
        }
        let teams = gameResult.rows[0].teams;
        let limit=gameResult.rows[0].team_limit;
        console.log('Teams:', gameResult.rows[0]);
        // Remove user from any previous team
        teams = teams.map(team => ({
            ...team,
            players: team.players.filter(player => player.userId !== userId)
        }));

        // Add user to the selected team if not full
        if (teams[teamIndex].players.length < limit) {
            teams[teamIndex].players.push({ userId: userId, username: userName, email: userEmail, favourite_position: userResult.rows[0].favourite_position });
        } else {
            console.log('Team is full:', teams[teamIndex].players.length, limit);
            return res.status(400).json({ message: 'Team is full' });
        }

        // Update game teams in the database
        const updateQuery = 'UPDATE games SET teams = $1 WHERE id = $2';
        await pool.query(updateQuery, [JSON.stringify(teams), gameId]);
        console.log('Updated teams:', teams);
        res.status(200).json({ message: 'Joined team successfully', teams });
    } catch (error) {
        console.error('Error joining team:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = jointeam;
