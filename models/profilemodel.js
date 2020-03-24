const mongoose = require('mongoose')

const Profile = mongoose.model('users', {
    user:mongoose.Types.ObjectId
    
})

module.exports = Profile