const { pool } = require('../Db/db');

// Middleware to get all upcoming games
async function games(req, res) {
    const { page = 1 } = req.query; // Get the page number from the query string, default to 1
    const limit = 10; // Limit to 10 results per page
    const offset = (page - 1) * limit; // Calculate the offset

    try {
        const query = `
            SELECT * FROM games
            ORDER BY start_time ASC
            LIMIT $1 OFFSET $2
        `;
        const values = [limit, offset];
        const result = await pool.query(query, values);

        const totalQuery = 'SELECT COUNT(*) FROM games'; // Get the total count of games
        const totalResult = await pool.query(totalQuery);
        const totalGames = parseInt(totalResult.rows[0].count, 10);

        res.json({
            games: result.rows,
            totalGames,
            totalPages: Math.ceil(totalGames / limit),
            currentPage: parseInt(page, 10)
        });
    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = games;
