const express = require('express');
const app = express();
const port = 3000;
const reqauth= require('./routes/req.jsx')
const oauth=require('./routes/oauth.jsx');
const { write } = require('fs');
const cors = require('cors');
const authenticateJWT = require('./middleware/authorisationJWT.js');
const jwt= require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { Sequelize } = require('sequelize');
const dotenv=require('dotenv')
const bcrypt=require('bcryptjs');
const { pool,createUsersTable,createGamesTable } = require('./Db/db.js');
const getUsers = require('./Db/getDb.js');
const checkUserExists = require('./Db/checkUserExists.js');
const logincheck = require('./Db/logincheck.js');
const getHome = require('./Db/getHome.js');
const postprofile = require('./middleware/settings/postProfile.js');
const changePassword = require('./middleware/settings/changePassword.js');
const changeEmail = require('./middleware/settings/changeemail.js');
const createGame = require('./middleware/creategame.js');
const games = require('./middleware/games.js');
const playgame = require('./middleware/playgame.js');
const jointeam= require('./middleware/jointeam.js');
const getUserUpcomingMatches = require('./middleware/getUserUpcomingMatches.js');
dotenv.config()
const users=[]
// Middleware to parse JSON bodies
app.use(express.json()); 
app.use(cookieParser());
app.use(cors({
  credentials: true,               // Allow cookies to be sent
  origin: true, // Replace with your React app's URL
}));
createUsersTable();
createGamesTable();


app.post('/register', async (req, res) => {
  const { username,firstname,lastname,email, password } = req.body;

  console.log(req.body)
  console.log(username,firstname,lastname,email,password)
  // Check if user already exists
  const emailExists = users.find(user => user.email === email);

  const userExists = await checkUserExists(username, email,'signup');
        if (userExists) {
            console.log('Username or email already exists.');
            return res.status(400).json({email:true});
        }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Save user
  const user = { email, password: hashedPassword };
   await pool.query(
    'INSERT INTO users (username, firstname, lastname, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [username, firstname, lastname, email, hashedPassword]
);

await getUsers();

  const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: '7d' });
  res.json({ token:token, userinfo:{username:username,firstname:firstname,lastname:lastname,email:email} });
  });


// User login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body.email, req.body.password);

  // Check if user exists
  const user = await logincheck(email);
  if (!user) {
    console.log('no user');
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  console.log('passwords: ', password, user.password);
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    console.log('no password');
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Generate Access Token (short-lived)
  const accessToken = jwt.sign(
    { email: user.email },
    process.env.SECRET_KEY,
    { expiresIn: '30d' } // Access token expires in 15 minutes
  );

  // Generate Refresh Token (long-lived)
  const refreshToken = jwt.sign(
    { email: user.email },
    process.env.REFRESH_SECRET_KEY,
    { expiresIn: '1m' } // Refresh token expires in 30 days
  );

  // Store the Refresh Token Securely (httpOnly cookie)
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true, // Prevents JavaScript access
    secure: true,   // Ensures it is sent over HTTPS
    sameSite: 'Strict', // CSRF protection
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  });

  user.password = null;

  // Send response with access token (but NOT the refresh token)
  res.json({ token:accessToken, userinfo: user });
});


app.post('/allinfo',authenticateJWT,async(req,res)=> { 
  const {email}=req.body;
  console.log('email is :',email)
  await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    } 
  )

}
  )

app.use('/auth',authenticateJWT, (req, res) => {
  res.json({ authenticated: true, user: req.user });
});
app.use('/creategame',authenticateJWT,createGame)
app.use('/jointeam',authenticateJWT,jointeam)
app.use('/games',authenticateJWT,games)
app.use('/game/:id',authenticateJWT,playgame)
app.use('/profile',authenticateJWT)
app.use('/settings/profile',authenticateJWT,postprofile)
app.use('/settings/changepassword',authenticateJWT,changePassword)
app.use('/settings/changeemail',authenticateJWT,changeEmail)
app.use('/req',reqauth);
app.use('/home',getHome);
app.use('/getUserUpcomingMatches',getUserUpcomingMatches);
app.use('/oauth',oauth);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
