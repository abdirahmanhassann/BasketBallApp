const bcrypt = require('bcryptjs');
const { pool } = require('../../Db/db'); // Adjust the path as necessary
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

async function changeEmail(req, res) {
  const { currentEmail, newEmail, currentPassword } = req.body;

  try {
    // Step 1: Check if the new email is already in use
    const emailCheckResult = await pool.query('SELECT id FROM users WHERE email = $1', [newEmail]);

    if (emailCheckResult.rows.length > 0) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

    // Step 2: Retrieve the user's current hashed password and other details from the database
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [currentEmail]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result.rows[0];

    // Step 3: Compare the provided current password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // Step 4: Update the email in the database
    const updateResult = await pool.query(
      'UPDATE users SET email = $1 WHERE email = $2 RETURNING *',
      [newEmail, currentEmail]
    );

    if (updateResult.rows.length === 0) {
      return res.status(404).json({ error: 'Failed to update email' });
    }

    // Step 5: Generate a new JWT token with the updated email
    const updatedUser = updateResult.rows[0];
    const token = jwt.sign({ email: updatedUser.email }, process.env.SECRET_KEY, { expiresIn: '7d' });

    // Step 6: Set the password field to null before sending it back to the frontend
    updatedUser.password = null;

    // Step 7: Return the updated user info and token to the frontend
    res.json({ token, user: updatedUser, message: 'Email updated successfully' });

  } catch (error) {
    console.error('Error changing email:', error);
    res.status(500).json({ error: 'Failed to change email' });
  }
}

module.exports = changeEmail;
