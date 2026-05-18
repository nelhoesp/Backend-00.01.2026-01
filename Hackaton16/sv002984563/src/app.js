const path = require(`path`);
const bodyParser = require("body-parser");
const express = require(`express`);
const passport = require("passport");
const session = require(`express-session`);
const productsRoutes = require("./routes/product.route");

const db = require(`./config/db`);

const app = express();

require(`./passport`);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));  

const SECRET = process.env.SECRET;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(
    session({
        secret: SECRET,
        resave:false,
        saveUninitialized:false,
        cookie:{
            secure:process.env.NODE_ENV === `production`,
            maxAge:24 * 60 * 60 * 1000
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());

let username;

app.get(`/`, (req,res)=>{
    authenticate(req,res)
});

function authenticate(req,res){
    if(!req.session.user){
        res.sendFile(`${__dirname}/public/sistema.html`)
    }else{
        username = req.session.user;

        res.sendFile(`${__dirname}/public/sistema.html`)
    }
}

app.get(`/google`, googleConfigured, passport.authenticate("google",{scope:[`email`]}));
app.get(`/google/callback`, googleConfigured, passport.authenticate("google",{failureRedirect:`/failed`}),(req,res)=>{
    finishOAuthLogin(req,res);
});

app.get(`/github`, githubConfigured, passport.authenticate("github",{scope:[`email`]}));
app.get(`/github/callback`, githubConfigured, passport.authenticate("github",{failureRedirect:`/failed`}),(req,res)=>{
    finishOAuthLogin(req,res);
});

app.get(`/success`,(req,res)=>{
    authenticate(req,res);
});

app.get(`/failed`, (req,res)=>{
    authenticate(req,res);
});

function githubConfigured(req,res,next){
    if(!process.env.GithubClienID || !process.env.GithubClienID || !process.env.GithubCBURL) {
         return res.status(500).send("Configura primero el cliente de github")
    }
    next();
}

function googleConfigured(req,res,next){
    if(!process.env.GoogleClienID || !process.env.GoogleSecret || !process.env.GoogleCBURL){
        return res.statur(500).send("Configura primero el cliente de google")
    }
    next();
}

function finishOAuthLogin(req,res){
    const oauthEmail = getOAuthEmail(req.user);
    if(!oauthEmail) {
        return res.redirect(`/failed`);
    }

    const sql = "INSERT INTO usuarios (username,password,email) VALUES(?,?)";
    db.query(sql, [oauthEmail, `oauth`, oauthEmail])
    .then(()=> {
        req.session.user = oauthEmail;
        res.redirect("/success");
    })
    .catch((err)=> {
        console.error(err);

        res.redirect("/failed");
    });

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

app.use("/products", productsRoutes);

module.exports = app;