const {pool} = require('../Db/db');
async function playgame(req, res, next) {   

    const gameId = req.params.id;
    try {
        const game = await pool.query('SELECT * FROM games WHERE id = $1', [gameId]);

        if (game.rows.length === 0) {
            return null;
        }
    
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }
        res.status(200).json( game.rows[0] );
    } catch (error) {
        console.error('Error fetching game:', error);
        res.status(500).json({ message: 'Server error' });
    }

}

module.exports = playgame;
