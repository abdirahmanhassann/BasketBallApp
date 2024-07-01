var express = require('express');
var router = express.Router();
const dotenv = require('dotenv');
const jwt= require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const session = require('express-session');

dotenv.config(); 


const {OAuth2Client} = require('google-auth-library');


async function getUserData(access_token) {

  const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);

  const data = await response.json();
  console.log('data',data);
}


router.get('/', async function(req, res, next) {
  const code = req.query.code;

  console.log(code);
  try {
      const redirectURL = "http://127.0.0.1:3000/oauth";
      const oAuth2Client = new OAuth2Client(
          process.env.CLIENT_ID,
          process.env.CLIENT_SECRET,
          redirectURL
      );

      const r =  await oAuth2Client.getToken(code);
      await oAuth2Client.setCredentials(r.tokens);
      console.info('Tokens acquired.');
      const user = oAuth2Client.credentials;
      console.log('credentials',user);

      const ticket = await oAuth2Client.verifyIdToken({
          idToken: user.id_token,
          audience: process.env.CLIENT_ID
      });

      console.log('ticket', ticket);

      const payload = ticket.getPayload();
      const appUser = {
          userId: payload['sub'],
          name: payload['name'],
          picture: payload['picture']
      };

      const token = jwt.sign(appUser, '1232123', {
          expiresIn: '1d'
      });

      
      console.log('token:',`${token}`)
      console.log('token:',token)
      console.log('token:',token)


      // res.cookie('token', token, {
      //   maxAge: 24 * 60 * 60 * 1000 * 10,
      //   httpOnly: false,
      //   sameSite: 'None', // SameSite attribute, case-sensitive
      //   secure: false, 
      //   domain: 'localhost', // Domain setting
      //   path: '/', // Path setting (optional, defaults to '/')
      // });
      res.json({ token });
      res.redirect('http://localhost:5173/');
      
  } catch (err) {
      console.log('Error logging in with OAuth2 user', err);
      res.redirect(`http://localhost:${process.env.PORT}/`);
  }
});
module.exports = router;