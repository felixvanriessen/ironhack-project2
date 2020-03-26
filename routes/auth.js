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
            res.send('user already exists')
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
    .catch(error => res.send("An error happened: ",error))
})

router.get("/logout", (req,res,next) => {
    req.session.destroy((err) => {
        res.redirect("/")
    });
});

module.exports = router