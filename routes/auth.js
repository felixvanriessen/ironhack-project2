const express = require('express')
const router = express.Router()
const User = require('../models/usermodel')
const Profile = require('../models/profilemodel')
const bcrypt = require("bcrypt");


router.get('/signup', (req,res)=>{
    res.render('signup')
})

router.post('/signup', (req,res) => {
    User
    .findOne({"username": req.body.username})
    .then(user => {
        if(user != null) {
            res.render("signup",{errorMessage: "The username already exists"})
        } else {
            bcrypt.hash(req.body.password, 10, function(err, hash){
                User.create({
                    username:req.body.username,
                    password:hash
                })
                .then(newUser=>{
                    Profile.create({
                        user:newUser._id
                    })
                    .then(()=>{
                        console.log('new profile created')
                        res.redirect('/login')
                    })
                    .catch(err=>console.log(err))
                })
                .catch(err=>console.log(err))
            })
        }

    })
    // const username = req.body.username;
    // const password = req.body.password;
    // const salt = bcrypt.genSalt(bcryptSalt);
    // const hashPass = bcrypt.hash(password,salt);
    
})

router.get('/login', (req,res)=>{
    res.render('login')
})

router.post("/login", (req,res) => {
    User
    .findOne({"username": req.body.username})
    .then(user => {
        if(!user) {
            res.send('This user does not exist')
        }
        else {
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if (!result) {
                    res.send('incorrect credentials')
                }
                else {
                    req.session.currentUser = user
                    res.redirect('/search')
                }
            })
        }
    })
    .catch(error => console.log(error))
})


router.get("/logout", (req,res,next) => {
    req.session.destroy((err) => {
        res.redirect("/login")
    });
});

router.get('/settings', (req,res)=>{
    res.render('settings')
})

module.exports = router