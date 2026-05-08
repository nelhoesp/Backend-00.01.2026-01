const passport = require("passport");

const GoogleStrategy = require('passport-google-oauth2').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
})

passport.use(new GoogleStrategy({
    clientID: process.env.GoogleClientID,
    clientSecret: process.env.GoogleSecret,
    callbackURL: process.env.GoogleCBURL,
    passReqToCallback: true
},function(request,accessToken,refreshToken,profile,done){
    return done(null, profile)
}));

passport.use(new GitHubStrategy({
    clientID: process.env.GitHubClientID,
    clientSecret: process.env.GitHubSecret,
    callbackURL: process.env.GitHubCBURL
},function(request,accessToken,refreshToken,profile,done){
    return done(null, profile)
}));