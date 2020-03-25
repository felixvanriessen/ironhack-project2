const mongoose = require('mongoose')

const Profile = mongoose.model('profiles', {
    user: mongoose.Types.ObjectId,
    fav_movies:[String],
    watchlist:[String]
});

module.exports = Profile