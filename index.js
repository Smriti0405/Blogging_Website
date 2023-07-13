const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const livereload = require('livereload');
const connectLivereload = require("connect-livereload");
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./model/user');
const expressSession = require('express-session');
const flash = require('connect-flash');



const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));


mongoose.connect('mongodb://127.0.0.1:27017/blogdb')
.then(()=> console.log('Database Connected'))
.catch((err)=> console.log(err));


app.use(expressSession({
    secret: 'onemoresecret',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        http: true,
        expires: Date.now()+1000* 60 * 60 * 24 * 7 * 1,
        maxAge:1000* 60 * 60 * 24 * 7 * 1                        // 1 week
    }
  }))

app.use(flash());  


app.engine('ejs',ejsMate)
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(methodOverride('_method'));
app.use(connectLivereload());


app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new localStrategy(User.authenticate()));


const blogRoute = require('./routes/blog');
const authRoute = require('./routes/auth');


app.use(blogRoute);
app.use(authRoute);



app.get('/',(req,res)=>{
    res.render('index')
})





const port = 4000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});