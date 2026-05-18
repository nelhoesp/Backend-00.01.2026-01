const passport = require(`passport`);

const GoogleStrategy = require(`passport-google-oauth2`).Strategy;
const GithubStrategy = require(`passport-github2`).Strategy;

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    __dirname(null,user);
})

passport.use(new GoogleStrategy({
    clientID: process.env.GoogleClienID,
    clientSecret: process.env.GoogleSecret,
    callbackURL: process.env.GoogleCBURL,
    passReqToCallback: true
},function(request,accessToken,refreshToken,profile,done){
    return done(null,profile)
}));

passport.use(new GithubStrategy({
    clientID: process.env.GithubClienID,
    clientSecret: process.env.GithubSecret,
    callbackURL: process.env.GithubCBURL   
},function(request,accessToken,refreshToken,profile,done){
    return done(null,profile)
}));