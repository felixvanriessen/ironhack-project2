const express = require('express')
const router = express.Router()


router.get('/', (req,res)=>{

    Cinema
    .create({
        openingdays: ["Monday","Tuesday","Wednesday"],
        seats: 200,
        region: "Amsterdam-West",
        street: "Overtoom",
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
        street: "Kerkstaat"
    })
    .then(created => {
        console.log("New cinema created")
    })
    .catch(error => {
        console.log("Error while creating a new cinema!")
    })

    Cinema
    .create({
        openingdays: ["Monday","Thursday","Friday"],
        seats: 200,
        region: "Amsterdam-West",
        street: "Overtoom"
    })
    .then(created => {
        console.log("New cinema created")
    })
    .catch(error => {
        console.log("Error while creating a new cinema!")
    })

    Cinema
    .create({
        openingdays: ["Monday","Tuesday","Wednesday"],
        seats: 200,
        region: "Amsterdam-West",
        street: "Overtoom"
    })
    .then(created => {
        console.log("New cinema created")
    })
    .catch(error => {
        console.log("Error while creating a new cinema!")
    })

    Cinema
    .create({
        openingdays: ["Monday","Tuesday","Wednesday"],
        seats: 200,
        region: "Amsterdam-West",
        street: "Overtoom"
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