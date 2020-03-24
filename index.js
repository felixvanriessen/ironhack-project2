const express = require('express')
const app = express()
const omdbApiKey = "b4781137"
const path = require('path')
const mongoose = require('mongoose')


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('public'))

const hbs = require('hbs')
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect('mongodb+srv://felix:Three534135@ihp2-zbze0.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,  
    useUnifiedTopology: true 
})
.then((x)=>console.log('connected to database'))
.catch(err=>console.log(err))


app.use('/', require('./routes/indexroute'))
app.use('/', require('./routes/auth'))
app.use('/', require('./routes/main'))

app.listen(3000, () =>{
    console.log('listening on', 3000)
})