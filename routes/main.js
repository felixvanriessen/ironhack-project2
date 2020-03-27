const express = require('express')
const router = express.Router()
const Profile = require('../models/profilemodel')
const Cinema = require('../models/cinemamodel')
const axios = require('axios')
const multer = require("multer")
const upload = multer({ dest: './public/uploads/' });

//only allow access if logged in
router.use((req,res,next) => {
    if(req.session.currentUser) {
        next()
    } else {
        res.redirect("/login")
    }
})

//render cinema info page of specific id
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

//render fav movies list
router.get("/favmovies", (req,res) => {
    Profile
    .findOne({user:req.session.currentUser._id})
    .then(profile=>{
        res.render('favmovies', {userHbs:profile})
    })
    .catch(err => console.log(err))
})

//render watchlist
router.get("/watchlist", (req,res) => {
    Profile.findOne({user:req.session.currentUser._id})
    .then(profile=>{
        res.render('watchlist', {userHbs:profile})
    })
    .catch(err=>console.log(err))
})

//add movie name to profile fav_movies list
router.get('/fav/:movie', (req,res)=>{
    Profile.findOneAndUpdate({user:req.session.currentUser._id},{ "$push": {fav_movies:req.params.movie} })
    .then(profile=>{
    })
    .catch(err=>console.log(err))
    res.redirect('../favmovies')
})

//remove movie from fav movies
router.get('/removef/:movie', (req,res)=>{
    Profile.findOneAndUpdate({user:req.session.currentUser._id},
        {
            $pull:{fav_movies:req.params.movie}
    })
    .then(profile=>{
        console.log(profile)
        res.redirect('/favmovies')
    })
    .catch(err=>console.log(err))
})

//remove movie from watchlist
router.get('/removew/:movie', (req,res)=>{
    Profile.findOneAndUpdate({user:req.session.currentUser._id},
        {
            $pull:{watchlist:req.params.movie}
    })
    .then(profile=>{
        res.redirect('/watchlist')
    })
    .catch(err=>console.log(err))
})

//add movie name to profile watchlist
router.get('/watch/:movie', (req,res)=>{
    Profile.findOneAndUpdate({user:req.session.currentUser._id},{ "$addToSet": {watchlist:req.params.movie} })
    .then(profile=>{
    })
    .catch(err=>console.log(err))
    res.redirect('../watchlist')
})

//render search('home') page 
router.get("/search", (req,res) => {
    Cinema
    .find()
    .then(cinemaData => {
        Profile.findOne({user:req.session.currentUser._id})
        .then(profile=>{
            res.render("search",{userHbs : profile, cinemaHbs:cinemaData})
        })
        .catch(err=>console.log(err))
    })
    .catch(error => {
        res.render("error", err)
    })
})

//render movie info page of searched movie
router.post("/search", (req,res) => {
    let searchterm = req.body.movie.split(' ').join('+')
    axios.get(`http://www.omdbapi.com/?apikey=b4781137&t=${searchterm}`)
    .then(response=>{
        let movieData = response.data
        res.render('movieprofile',{movieHbs:movieData})
    })
    .catch(err=>{console.log(err)})
})

//render movie info page of clicked movie
router.get('/movieprofile/:movie', (req,res)=>{
    let mov = req.params.movie.split(' ').join('+')
    axios.get(`http://www.omdbapi.com/?apikey=b4781137&t=${mov}`)
    .then(response=>{
        let movieData = response.data
        res.render('movieprofile',{movieHbs:movieData})
    })
    .catch(err=>{console.log(err)})
})

//render settings page
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


//update user settings
router.post("/save",upload.single("profileimage"),(req,res) => {
    let fileimage = ''
    if (req.file){
        fileimage = req.file.filename
    } else {
        Profile.findOne({user:req.session.currentUser._id})
        .then(profile=>{
            fileimage = profile.imagefile
        })
        .catch(err=>console.log(err))
    }

    Profile
    .findOneAndUpdate({user:req.session.currentUser._id}, {
        name: req.body.username,
        imagefile: fileimage,
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