const express = require('express')
const router = express.Router()

router.get('/signup', (req,res)=>{
    res.render('signup')
})

router.get('/login', (req,res)=>{
    res.render('login')
})

//testing
router.get('/settings', (req,res)=>{
    res.render('settings')
})


module.exports = router