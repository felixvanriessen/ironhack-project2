const express = require('express')
const app = express()
const omdbApiKey = "b4781137"
const path = require('path')
const mongoose = require('mongoose')
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('public'))

const hbs = require('hbs')
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb+srv://piepongwong:12345felix@ihp2-zbze0.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,  
    useUnifiedTopology: true 
})
.then((x)=>console.log('connected to database'))
.catch(err=>console.log(err))


app.use('/', require('./routes/indexroute'))
app.use('/', require('./routes/auth'))
app.use('/', require('./routes/main'))

app.use(session({
    secret: "basic-auth-secret",
    cookie: {maxAge: 60000},
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 24 * 60 * 60
    })
}));

app.listen(3000, () =>{
    console.log('listening on', 3000)
})