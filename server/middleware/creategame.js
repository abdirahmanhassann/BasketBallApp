const { pool } = require('../Db/db');

// Middleware to create a game
const createGame = async (req, res, next) => {
    const {
        title,
        description,
        tags,
        pitch,
        date,
        time,
        private,
        indoor,
        training,
        applications,
        team_limit,
        gender,
        payment,
        amount
    } = req.body.formData;
    const venue_id=req.body.venue.id
    const email = req.user.email;
    console.log('Create game email is:', email);
    const now = new Date();
    now.setDate(now.getDate() + 1);

    const start_time = new Date(`${date}T${time}`);

    try {
        console.log('time:',start_time,now)
        if (start_time<now)  {
            return res.status(404).json({ message: 'Please choose a date that is at least one day in advance' }); ; // Return true if start_time is in the future
        };

        // Query to get the owner_id based on email
        const ownerQuery = `
            SELECT id FROM users WHERE email = $1
        `;
        const ownerResult = await pool.query(ownerQuery, [email]);

        if (ownerResult.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const owner_id = ownerResult.rows[0].id;
        console.log('Owner ID is:', owner_id);

        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to 00:00:00 to compare only the date

        // Query to check if the user has already created a game today
        const checkGameQuery = `
            SELECT id FROM games 
            WHERE owner_id = $1 AND created_at::date = $2 
        `;
        const checkGameResult = await pool.query(checkGameQuery, [owner_id, today]);

        console.log('checking',owner_id,today,checkGameResult.rows)
        // if (checkGameResult.rows.length > 0) {
        //     return res.status(400).json({ message: 'You have already created a game today. You cannot create more than one game per day.' });
        // }

        // Validate required fields
        console.log('gameValues:',title,description,date,time,venue_id)
        if (!title || !description || !date || !time || venue_id<0 ) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Combine date and time into a single timestamp

        const gameQuery = `
            INSERT INTO games (
                title, description, tags, pitch, start_time, is_private, 
                is_indoor, is_training, accept_applications, team_limit, 
                gender_options, payment_option, venue_id, owner_id,amount
            ) VALUES (
                $1, $2, $3, $4, $5, $6, 
                $7, $8, $9, $10, 
                $11, $12, $13, $14,$        15
            ) RETURNING id
        `;

        const gameValues = [
            title, description, tags, pitch, start_time, private,
            indoor, training, applications, team_limit,
            gender, payment, venue_id, owner_id,amount
        ];

        const result = await pool.query(gameQuery, gameValues);
        const gameId = result.rows[0].id;

        // Attach the gameId to the request object to make it available in the next middleware/route handler
        req.gameId = gameId;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error creating game:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = createGame;
    