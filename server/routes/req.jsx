const express=require('express')
const router= express.Router()
const dotenv=require('dotenv');
dotenv.config();
const{OAuth2Client}=require('google-auth-library')


router.post('/',async function(req,res,next){
    res.header('Access-Control-Allow-Origin','http://localhost:5173')
    console.log('header sent')
    res.header('Referrer-Policy','no-referrer-when-downgrade')
    const redirectURL='http://127.0.0.1:3000/oauth';
    
    const oAuth2Client = new OAuth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        redirectURL
        );
        
        const authorizeUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/userinfo.profile  openid ',
            prompt: 'consent'
            });
        console.log('oauth generated')
    
        res.json({url:authorizeUrl})
    
    })
module.exports=router;