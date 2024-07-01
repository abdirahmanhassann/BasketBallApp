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

// Middleware to parse JSON bodies
app.use(express.json()); 
app.use(cookieParser());
app.use(cors({
  credentials: true,               // Allow cookies to be sent
  origin: true, // Replace with your React app's URL
}));




// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Define another route
app.get('/about', (req, res) => {
  res.send('About Page');
});

// Define a route with a parameter
app.get('/user/:name', (req, res) => {
  res.send(`Hello, ${req.params.name}`);
});

// Define a POST route
app.post('/data', (req, res) => {
  res.json(req.body);
});

app.use('/req',reqauth);

app.use('/oauth',oauth);

app.get('/po', (req, res) => {
  console.log(req.cookies)
  if (!req.token) {
    // res.cookie('token', 'token', {
    //   maxAge: 24 * 60 * 60 * 1000 * 10,
    //   httpOnly: true,
    //   sameSite: 'None',
    //   secure: true, 
    //   domain: 'localhost', // Domain setting
    // });
        
    return res.status(401).send('Unauthorized');
  }
  console.log('logged in')
  res.send( `you are authenticated`);
});


// app.get('/po',authenticateJWT,(req,res,next)=>{
//   console.log('u are logged in via /po')
//   res.send('logged in')
// })
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
