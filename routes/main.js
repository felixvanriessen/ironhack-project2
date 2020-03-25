const express = require('express')
const router = express.Router()
const Profile = require('../models/profilemodel')
const axios = require('axios')


// router.use((req,res,next) => {
//     if(req.session.currentUser) {
//         next()
//     } else {
//         res.redirect("/login")
//     }
// })

router.get("/cinema", (req,res) => {
    res.render("cinema")
})

router.get("/favmovies", (req,res) => {
    res.render("favmovies")
})

router.get("/movieprofile", (req,res) => {
    res.render("movieprofile")
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

router.get("/watchlist", (req,res) => {
    res.render("watchlist")
})

module.exports = router