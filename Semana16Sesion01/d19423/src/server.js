require('dotenv').config();

const express = require('express');
const path = require('path');


const app = express();
const server  = require('http').Server(app);
const io = require('socket.io')(server);

const bodyParser = require('body-parser');
const passport = require('passport');

const bcryptjs = require('bcryptjs');

const session = require('express-session');

const con  = require('./database/db');

require('./passport');

const PORT = process.env.PORT || 3000;
const SECRET = process.env.SECRET;

app.use(express.static(path.join(__dirname,"public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session(
    {
        secret: SECRET,
        resave:false,
        saveUninitialized:false,
        cookie:{
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000
        }
    }
));
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req,res)=>{
    authenticate(req,res);
})


let username;

function authenticate(req,res){
    if(!req.session.user){
        res.sendFile(`${__dirname}/public/login.html`)
    }else{
        username = req.session.user
        res.sendFile(`${__dirname}/public/chat.html`)
    }
}

app.get('/google',googleConfigured, passport.authenticate("google",{scope:['email']}));
app.get('/google/callback',googleConfigured, passport.authenticate("google",{failureRedirect:'/failed'}), (req,res)=>{
    finishOAuthLogin(req,res);
})

app.get('/github',githubConfigured, passport.authenticate("github",{scope:['email']}));
app.get('/github/callback',githubConfigured, passport.authenticate("github",{failureRedirect:'/failed'}), (req,res)=>{
    finishOAuthLogin(req,res);
})

app.get('/success',(req,res)=>{
    authenticate(req,res)
})

function githubConfigured(req,res,next){
    if(!process.env.GitHubClientID || !process.env.GitHubSecret||!process.env.GitHubCBURL) 
        return res.status(500).send("Configura primero el cliente de github");

    next();
}

function googleConfigured(req,res,next){
    if(!process.env.GoogleClientID || !process.env.GoogleSecret||!process.env.GoogleCBURL) 
        return res.status(500).send("Configura primero el cliente de google");

    next();
}

function finishOAuthLogin(req,res){
    const oauthEmail = getOAuthEmail(req.user);
    if(!oauthEmail) return res.redirect('/failed');

    const sql = "REPLACE INTO login (username,password) VALUES(?,?);"
    con.query(sql, [oauthEmail,'oauth'], (err,result)=>{
        if(err) throw err;
        req.session.user =  oauthEmail;
        res.redirect('/chat_start');
    })
}

function getOAuthEmail(user){
    console.log(user);

    if(user.email) return user.email;

    if(Array.isArray(user.emails) && user.emails.length > 0){
        const primaryEmail = user.emails.find((item)=>item.primary) || user.emails[0];
        return primaryEmail.value || user.id;
    }
    return user.username || user.id
}


server.listen(PORT,()=>console.log(`Servidor iniciado en el puerto ${PORT}`));