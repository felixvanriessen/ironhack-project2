const mongoose = require("mongoose")
const Schema = mongoose.Schema

const cinemaSchema = new Schema({
    openingdays: [String],
    seats: Number,
    region: String,
    street: String,
    image: String
});

const Cinema = mongoose.model("cinema",cinemaSchema);

module.exports = Cinema;
