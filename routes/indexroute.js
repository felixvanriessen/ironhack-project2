const express = require('express')
const router = express.Router()
const Cinema = require('../models/cinemamodel')

router.get('/', (req,res)=>{
    res.render('index')
})

module.exports = router

