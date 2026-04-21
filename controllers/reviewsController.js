const db = require('../database/db');

function create(req, res) {
    const { movie_id, author, rating, content } = req.body;

    if (!movie_id || !author || !rating || !content) {
        return res.status(400), json({ error: 'Tutti i campi sono obbligatori' })
    }

    const sql = `
    INSERT INTO reviews (movie_id, author, rating, content)
    VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [movie_id, author, rating, content], (err, result) => {
        if (err) {
            console.error('Errore inserimento recensione:', err);
            return res.status(500).json({ error: 'Errore nel server' });
        }

        res.json({
            message: 'Recensione aggiunta con successo',
            review: {
                id: result.insertId,
                movie_id,
                author,
                rating,
                content
            }
        })
    })
}

module.exports = { create }