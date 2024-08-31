// db.js
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'basketball',
    password: 'abdi',
    port: 5432,
});

const createUsersTable = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            firstname VARCHAR(50) NOT NULL,
            lastname VARCHAR(50) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            gender VARCHAR(50),
            bio TEXT,
            phone VARCHAR(50),
            favourite_position VARCHAR(50)


        );
    `;
    try {
        await pool.query(createTableQuery);
        console.log('Users table created or already exists.');
    } catch (error) {
        console.error('Error creating users table:', error);
    }
};

module.exports = { pool, createUsersTable };
