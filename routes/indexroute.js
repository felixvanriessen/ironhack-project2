const express = require('express')
const router = express.Router()


router.get('/', (req,res)=>{

    Cinema
    .create({
        openingdays: ["Monday","Tuesday","Wednesday"],
        seats: 200,
        region: "Amsterdam-West",
        street: "Weststraat",
        image: "images/theatre1.jpg"
    })
    .then(created => {
        console.log("New cinema created")
    })
    .catch(error => {
        console.log("Error while creating a new cinema!")
    })

    Cinema
    .create({
        openingdays: ["Monday","Tuesday","Friday"],
        seats: 250,
        region: "Amsterdam-Oost",
        street: "Ooststraat",
        image: "images/theatre2.jpg"
    })
    .then(created => {
        console.log("New cinema created")
    })
    .catch(error => {
        console.log("Error while creating a new cinema!")
    })

    Cinema
    .create({
        openingdays: ["Tuesday","Saturday","Sunday"],
        seats: 300,
        region: "Amsterdam-Noord",
        street: "Noorderstraat",
        image: "images/theatre3.jpg"
    })
    .then(created => {
        console.log("New cinema created")
    })
    .catch(error => {
        console.log("Error while creating a new cinema!")
    })

    Cinema
    .create({
        openingdays: ["Monday","Friday","Saturday"],
        seats: 220,
        region: "Amsterdam-Zuid",
        street: "Zuiderstraat",
        image: "images/theatre4.jpg"
    })
    .then(created => {
        console.log("New cinema created")
    })
    .catch(error => {
        console.log("Error while creating a new cinema!")
    })

    Cinema
    .create({
        openingdays: ["Thursday","Friday","Sunday"],
        seats: 500,
        region: "Amsterdam-Centrum",
        street: "Overtoom",
        image: "images/theatre5.jpg"
    })
    .then(created => {
        console.log("New cinema created")
    })
    .catch(error => {
        console.log("Error while creating a new cinema!")
    })

    res.render('index')
})


module.exports = router