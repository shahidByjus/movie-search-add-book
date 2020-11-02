const express = require('express');
const Movie = require('./models/Movie');

const router = express.Router();

module.exports = function() {
    router.get('/getMovies/:searchValue', async (req, res) => {
        const { searchValue } = req.params;
        const movieData = await Movie.find({title : searchValue});

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
    })

    router.delete('/deleteMovie/:searchValue', async (req, res) => {
        const { searchValue } = req.params;
        const detail = await Movie.remove({ title : searchValue });

        res.send('Movie Deleted successfully');
    })

    return router;
}