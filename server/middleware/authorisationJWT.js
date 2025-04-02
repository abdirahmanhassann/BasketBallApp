const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authenticateJWT = (req, res, next) => {
  let token = req.headers['authorization'];
  if (token && token.startsWith('Bearer ')) {
    token = token.split(' ')[1];
  } else {
    console.log('token:', req.body.token);
    token = req.body.token ;
  }

  if (!token) {
    console.log('No token provided',token);
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      // If the error is due to token expiration, check the refresh token
      if (err.name === 'TokenExpiredError') {
        const refreshToken = req.body.refreshToken;  // Make sure frontend sends this
        if (!refreshToken) {
          return res.status(401).json({ message: 'Refresh token missing' });
        }

        // Verify refresh token
        jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (refreshErr, refreshDecoded) => {
          if (refreshErr) {
            return res.status(403).json({ message: 'Invalid or expired refresh token' });
          }

          // Generate new access token
          const newAccessToken = jwt.sign(
            { email: refreshDecoded.email },
            process.env.SECRET_KEY,
            { expiresIn: '15m' }
          );

          res.json({ newAccessToken });
        });
      } else {
        return res.status(403).json({ message: 'Invalid token' });
      }
    } else {
      req.user = decoded;
      console.log('decoded:', decoded);
      next();
    }
  });
};

module.exports = authenticateJWT;
