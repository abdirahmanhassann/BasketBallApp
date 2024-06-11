const express = require('express');
const app = express();
const port = 3000;
const reqauth= require('./routes/req.jsx')
const oauth=require('./routes/oauth.jsx')
// Middleware to parse JSON bodies
app.use(express.json());

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
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
