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
})

router.get('/watch/:movie', (req,res)=>{
    Profile.findOneAndUpdate({user:req.session.currentUser._id},{ "$push": {watchlist:req.params.movie} })
    .then(profile=>{
    })
    .catch(err=>console.log(err))
    res.redirect('../watchlist')
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
    res.render('settings')
})

router.post('/settings', (req,res)=>{
    Profile.findOneAndUpdate({user:req.session.currentUser._id}, {

    })
    res.redirect('search')
})

module.exports = router