const { pool } = require('./db');

const logincheck = async (email) => {
    let query = `
            SELECT *
            FROM users
            WHERE email = $1;
            `;

    try {
        const res = await pool.query(query, [email]);
        if (res.rows.length > 0) {
            console.log('res rows:',res.rows[0])
            return res.rows[0]; // User already exists
        } else {
            return false; // User does not exist
        }
    } catch (err) {
        console.error('Error checking user existence:', err);
        throw err;
    }
};


module.exports=logincheck;