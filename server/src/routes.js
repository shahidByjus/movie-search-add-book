const express = require('express');
const Movie = require('./models/Movie');

const router = express.Router();

module.exports = function() {
    router.get('/getMovies/:searchValue', async (req, res) => {
        const { searchValue } = req.params;
        const movieData = await Movie.find({title : searchValue});

        return res.send(movieData);
    });

    router.get('/getUpdateMovie/:searchValue', async (req, res) => {
        const { searchValue } = req.params;
        const movieData = await Movie.find({imdbId : searchValue});

        return res.send(movieData);
    });

    router.get('/detail/:searchValue', async (req, res) => {
        const { searchValue } = req.params;
        const detail = await Movie.find({imdbId : searchValue});

        return res.send(detail);
    });

    router.post('/addMovie', async (req, res) => {
        const { title, year, imdbId, type, poster } = req.body;
        
        const movie = new Movie({
            title,
            year,
            imdbId,
            type,
            poster
        });
        await movie.save();

        res.send('Movie added successfully');
    });

    router.put('/updateMovie', async (req,res) => {
        const {title, year, imdbId, type, poster} = req.body;

        const updatedData = await Movie.updateOne({imdbId : imdbId},{$set:{
            title : title,
            year : year,
            type : type,
            poster : poster
        }});

        res.send(updatedData);
    });

    router.delete('/deleteMovie/:searchValue', async (req, res) => {
        const { searchValue } = req.params;

        const detail = await Movie.remove({ imdbId : searchValue });

        res.send('Movie Deleted successfully');
     });

    return router;
}