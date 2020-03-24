const express = require('express')
const app = express()
const omdbApiKey = "b4781137"
const path = require('path')

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('public'))

const hbs = require('hbs')
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', require('./routes/indexroute'))
app.use('/', require('./routes/auth'))
app.use('/', require('./routes/main'))

app.listen(3000, () =>{
    console.log('listening on', 3000)
})