const bcrypt = require('bcryptjs');
const { pool } = require('../../Db/db'); // Adjust the path as necessary

async function changePassword(req, res, next) {
  const { email, currentPassword, newPassword } = req.body;

  try {
    // Step 1: Retrieve the user's current hashed password from the database
    const result = await pool.query('SELECT password FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result.rows[0];

    // Step 2: Compare the provided current password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    if(newPassword === currentPassword){
      return res.status(400).json({ error: 'New password cannot be the same as the current password' });
    }

    // Step 3: Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Step 4: Update the password in the database
    const updateResult = await pool.query(
      'UPDATE users SET password = $1 WHERE email = $2 RETURNING *',
      [hashedNewPassword, email]
    );

    if (updateResult.rows.length === 0) {
      return res.status(404).json({ error: 'Failed to update password' });
    }

    // Password successfully updated
    
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ error: 'Failed to change password' });
  }
}

module.exports = changePassword;
