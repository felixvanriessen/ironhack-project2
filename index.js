const express = require('express')
const app = express()
const omdbApiKey = "b4781137"

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

const hbs = require('hbs')
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')


app.use('/', require('./routes/indexroute'))
app.use('/', require('./routes/auth'))


app.listen(3000, ()=>{
    console.log('listening on', 3000)
})