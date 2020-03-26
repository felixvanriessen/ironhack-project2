const express = require('express')
const router = express.Router()
const Profile = require('../models/profilemodel')
const Cinema = require('../models/cinemamodel')
const axios = require('axios')

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
        res.render('favmovies', {moviesHbs:profile.fav_movies})
    })
    .catch(err => console.log(err))
})

//render watchlist
router.get("/watchlist", (req,res) => {
    Profile.findOne({user:req.session.currentUser._id})
    .then(profile=>{
        res.render('watchlist', {moviesHbs:profile.watchlist})
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
        res.render("search",{cinemaHbs : cinemaData})
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
    res.render('settings')
})

//update profile settings
router.post('/settings', (req,res)=>{
    Profile.findOneAndUpdate({user:req.session.currentUser._id}, {
        
    })
    res.redirect('search')
})

module.exports = router