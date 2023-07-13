const User = require('../model/user')
const express = require('express');
const router = express.Router();
const passport = require('passport')

router.get('/blogs/register', (req,res)=>{
    res.render('register')
})

router.post('/register', async(req,res)=>{
    const { email,twitter,insta,username,password } = req.body;
    const user = new User({ email,twitter,insta,username })
    const newUser = await User.register(user,password);
    req.flash('success','Congratulations! You are now a member.')
    res.redirect('/blogs/login');
    // res.send(newUser);
})

router.get('/blogs/login',(req,res)=>{
    res.render('login');
})

router.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/blogs');
    })

router.get('/logout', (req, res) => { 
    req.logout(function(err) {
        if (err) { return next(err); }

        req.flash('success','GoodBye, See you again')
        res.redirect('/');
    });
});



module.exports = router;