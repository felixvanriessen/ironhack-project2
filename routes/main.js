const express = require('express')
const router = express.Router()
const Profile = require('../models/profilemodel')
const Cinema = require('../models/cinemamodel')
const axios = require('axios')
const multer = require("multer")
const upload = multer({ dest: './public/uploads/' });


router.use((req,res,next) => {
    if(req.session.currentUser) {
        next()
    } else {
        res.redirect("/login")
    }
})

router.get("/cinema/:id", (req,res) => {
    Cinema
    .findById(req.params.id)
    .then(cinemafound => {
        res.render("cinema", {cinemaHbs: cinemafound});
    })
    .catch(error => {
        res.render("error",error);
    })
})

router.get("/favmovies", (req,res) => {
    Profile
    .findOne({user:req.session.currentUser._id})
    .then(profile=>{
        res.render('favmovies', {moviesHbs:profile.fav_movies})
    })
    .catch(err => console.log(err))
})

router.get("/watchlist", (req,res) => {
    Profile.findOne({user:req.session.currentUser._id})
    .then(profile=>{
        res.render('watchlist', {moviesHbs:profile.watchlist})
    })
    .catch(err=>console.log(err))
})

router.get('/fav/:movie', (req,res)=>{
    Profile.findOneAndUpdate({user:req.session.currentUser._id},{ "$push": {fav_movies:req.params.movie} })
    .then(profile=>{
    })
    .catch(err=>console.log(err))
    res.redirect('../favmovies')
})

router.get('/watch/:movie', (req,res)=>{
    Profile.findOneAndUpdate({user:req.session.currentUser._id},{ "$push": {watchlist:req.params.movie} })
    .then(profile=>{
    })
    .catch(err=>console.log(err))
    res.redirect('../watchlist')
})


router.get("/search", (req,res) => {
    Cinema
    .find()
    .then(cinemaData => {
        res.render("search",{cinemaHbs : cinemaData})
    })
    .catch(error => {
        res.render("error", err)
    })
})

router.post("/search", (req,res) => {
    let searchterm = req.body.movie.split(' ').join('+')
    axios.get(`http://www.omdbapi.com/?apikey=b4781137&t=${searchterm}`)
    .then(response=>{
        let movieData = response.data
        res.render('movieprofile',{movieHbs:movieData})
    })
    .catch(err=>{console.log(err)})
})

router.get('/movieprofile/:movie', (req,res)=>{
    let mov = req.params.movie.split(' ').join('+')
    axios.get(`http://www.omdbapi.com/?apikey=b4781137&t=${mov}`)
    .then(response=>{
        let movieData = response.data
        res.render('movieprofile',{movieHbs:movieData})
    })
    .catch(err=>{console.log(err)})
})

router.get('/settings',(req,res)=>{

    Profile
    .findOne({user: req.session.currentUser._id})
    .then(currentsettings => {
        res.render('settings',{settingsHbs:currentsettings})    
    })
    .catch(error => {
        res.render("An error has happened: ", error)
    })

})

router.post("/save",upload.single("profileimage"),(req,res) => {
    Profile
    .findOneAndUpdate({user:req.session.currentUser._id}, {
        name: req.body.username,
        imagefile: req.file.filename,
        nationality: req.body.nationality,
        birthyear: req.body.birthyear,
        firstlanguage: req.body.firstlanguage
     })
    .then(() => {
        console.log("Your profile has been updated!")
        res.redirect('/settings')
    })
    .catch(error => {
        console.log("An error has happened: ", error)
    }) 
})

module.exports = router