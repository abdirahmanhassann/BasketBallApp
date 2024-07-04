const { pool } = require("./db");

const getUsers = async () => {
    const query = 'SELECT * FROM users;';

    try {
        const res = await pool.query(query);
        console.log('Users:', res.rows);
    } catch (err) {
        console.error('Error fetching users:', err);
    }
};

// Example usage
module.exports=getUsers;
