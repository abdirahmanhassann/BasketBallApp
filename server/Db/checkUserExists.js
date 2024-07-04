const { pool } = require('./db');

const checkUserExists = async (username, email,type) => {
    let query = `
        SELECT 1
        FROM users
        WHERE username = $1 OR email = $2
        LIMIT 1;
        `;
    

    try {
        const res = await pool.query(query, [username, email]);
        if (res.rows.length > 0) {
            return true; // User already exists
        } else {
            return false; // User does not exist
        }
    } catch (err) {
        console.error('Error checking user existence:', err);
        throw err;
    }
};


module.exports=checkUserExists;