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

const createGamesTable = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS games (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            tags VARCHAR(255),
            pitch VARCHAR(255),
            start_time TIMESTAMP NOT NULL,
            is_private BOOLEAN DEFAULT FALSE,
            is_indoor BOOLEAN DEFAULT FALSE,
            is_training BOOLEAN DEFAULT FALSE,
            accept_applications BOOLEAN DEFAULT FALSE,
            team_limit INTEGER DEFAULT 5,
            gender_options VARCHAR(50) DEFAULT 'coed',
            payment_option VARCHAR(50) DEFAULT 'online',
            venue_id INTEGER NOT NULL,
            owner_id INTEGER NOT NULL REFERENCES users(id),
            applicants INTEGER[] DEFAULT '{}',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            amount INTEGER DEFAULT 0
        );
    `;

    try {
        await pool.query(createTableQuery);
        console.log('Games table created or already exists.');
    } catch (error) {
        console.error('Error creating games table:', error);
    }
};

module.exports = { pool, createUsersTable, createGamesTable };
