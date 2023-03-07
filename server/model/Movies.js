const mongoose = require("mongoose");

const {Schema, model} = mongoose;

const MovieSchema = new Schema({
    title:String,
    year: String,
    directors: String,
    genres: String,
    stars: String,
    plot: String,
    id: String
})


const Movie = model("Movie", MovieSchema)

module.exports = Movie;