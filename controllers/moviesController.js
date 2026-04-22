const db = require('../database/db');

// Index
function index(req, res) {
    const sql = 'SELECT * FROM movies';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Errore nella query:', err);
            return res.status(500).json({ error: 'Errore nel server' });
        }
        res.json(results);
    });
}

// Show
function show(req, res) {
    const movieId = req.params.id;

    const sqlMovie = 'SELECT * FROM movies WHERE id = ?';
    const sqlReviews = 'SELECT * FROM reviews WHERE movie_id = ?';
    const sqlAvg = 'SELECT AVG(rating) AS avg_rating FROM reviews WHERE movie_id = ?';

    // 1) Recupero film
    db.query(sqlMovie, [movieId], (err, movieResults) => {
        if (err) {
            console.error('Errore nella query del film:', err);
            return res.status(500).json({ error: 'Errore nel server' });
        }
        if (movieResults.length === 0) {
            return res.status(404).json({ error: 'Film non trovato' });
        }

        const movie = movieResults[0];

        // 2) Recupero media voto
        db.query(sqlAvg, [movieId], (err, avgResults) => {
            if (err) {
                console.error('Errore nella query della media voto:', err);
                return res.status(500).json({ error: 'Errore nel server' });
            }

            movie.avg_rating = avgResults[0].avg_rating
                ? Number(avgResults[0].avg_rating)
                : null;


            // 3) Recupero recensioni
            db.query(sqlReviews, [movieId], (err, reviewResults) => {
                if (err) {
                    console.error('Errore nella query delle recensioni:', err);
                    return res.status(500).json({ error: 'Errore nel server' });
                }

                res.json({ movie, reviews: reviewResults });
            });
        });
    });
}


module.exports = { index, show };