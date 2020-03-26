const mongoose = require('mongoose')

const Profile = mongoose.model('profiles', {
    user: mongoose.Types.ObjectId,
    fav_movies:[String],
    watchlist:[String],
    name: String,
    imagefile: String,
    nationality: String,
    birthyear: Number,
    firstlanguage: String
});

module.exports = Profile