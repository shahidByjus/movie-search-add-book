const mongoose = require('mongoose');

const Movie = mongoose.model('Movie', {
    title : String,
    year : String,
    imdbId : String,
    type : String,
    poster : String
});

module.exports = Movie;