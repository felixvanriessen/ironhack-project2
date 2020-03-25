const express = require('express')
const router = express.Router()
const Profile = require('../models/profilemodel')
const axios = require('axios')

router.use((req,res,next) => {
    if(req.session.currentUser) {
        next()
    } else {
        res.redirect("/login")
    }
})

router.get("/cinema", (req,res) => {
    res.render("cinema")
})

router.get("/favmovies", (req,res) => {
    Profile.findOne({user:req.session.currentUser._id})
    .then(profile=>{
        res.render('favmovies', {moviesHbs:profile.fav_movies})
    })
    .catch(err=>console.log(err))
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

    // let movie = req.params.movie.split(' ').join('+')
    // axios.get(`http://www.omdbapi.com/?apikey=b4781137&t=${movie}`)
    // .then(response=>{
    //     let mov = response.data
    //     Profile.findOne({user:req.session.currentUser._id})
    //     .then(profile=>{
    //         profile.fav_movies.unshift(mov.Title)
    //     })  
    // })
})


router.get("/search", (req,res) => {
    res.render("search")
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