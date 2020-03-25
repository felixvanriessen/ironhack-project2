const express = require('express')
const router = express.Router()
const User = require('../models/usermodel')
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const session = require('')

router.get('/signup', (req,res)=>{
    res.render('signup')
})

router.post('/signup', (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password,salt);

    User
    .findOne({"username": username})
    .then(user => {
        if(user != null) {
            res.render("signup",{errorMessage: "The username already exists"})
        }
    })

    User
    .create({
        username,
        password: hashPass
    })
    .then(()=> {
        res.redirect("/login");
    })
    .catch(error => {
        console.log(error)
    })
})

router.get('/login', (req,res)=>{
    res.render('login')
})

router.post("/login", (req,res) => {
    const theUsername = req.body.username;
    const thePassword = req.body.password;

    // if(theUsername === "" || thePassword === "") {
    //     res.render("login",{errorMessage: "Please enter both username and password to sign up"})
    //     return;
    // }

    User
    .findOne({"username": theUsername})
    .then(user => {
        if(!user) {
            res.render("login", {errorMessage: "The username doesn't exist"})
        }
        else {
            bcrypt.compare(thePassword, user.password, function(err, result) {
                if (!result) {
                    res.send('incorrect')
                }
                else {
                    req.session.currentUser = user
                    res.redirect('/search')
                }
            })
        }
    })
        // if(bcrypt.compareSync(thePassword,user.password)) {
        //     req.session.currentUser = user;
        //     res.redirect("/") 
        // } else {
        //     res.render("login", {errorMessage: "Incorrect password"});
        // }
    .catch(error => {console.log(error)
    })


// router.get("/logout", (req,res,next) => {
//     req.session.destroy((err) => {
//         res.redirect("/login")
//     });
// });

// router.get('/settings', (req,res)=>{
//     res.render('settings')
// })

module.exports = router