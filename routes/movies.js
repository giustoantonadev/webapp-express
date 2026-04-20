const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM movies';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Errore nella query:', err);
            return res.status(500).json({ error: 'Errore nel server' });
        }
        res.json(results);
    });
});

// Show
router.get('/:id', (req, res) => {
    const movieId = req.params.id;
    const sql = 'SELECT * FROM movies WHERE id = ?';
    const sqlReviews = 'SELECT * FROM reviews WHERE movie_id = ?';

    db.query(sql, [movieId], (err, movieResults) => {
        if (err) {
            console.error('Errore nella query del film:', err);
            return res.status(500).json({ error: 'Errore nel server' });
        }
        if (movieResults.length === 0) {
            return res.status(404).json({ error: 'Film non trovato' });
        }

        db.query(sqlReviews, [movieId], (err, reviewResults) => {
            if (err) {
                console.error('Errore nella query delle recensioni:', err);
                return res.status(500).json({ error: 'Errore nel server' });
            }
            res.json({ movie: movieResults[0], reviews: reviewResults });
        });
    });
});

module.exports = router;