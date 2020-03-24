const express = require('express')
const router = express.Router()


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

router.get("/watchlist", (req,res) => {
    res.render("watchlist")
})

module.exports = router