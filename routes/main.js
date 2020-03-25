const express = require('express')
const router = express.Router()
const Profile = require('../models/profilemodel')
const Cinema = require('../models/cinemamodel')
const axios = require('axios')


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
    Profile.findOne({user:req.session.currentUser._id})
    .then(profile=>{
        res.render('favmovies', {moviesHbs:profile.fav_movies})
    })
    .catch(err => console.log(err))
})

router.get("/watchlist", (req,res) => {
    res.render("watchlist")
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

module.exports = router