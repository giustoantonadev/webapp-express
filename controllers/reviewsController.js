const db = require('../database/db');

function create(req, res) {
    const { movie_id, author, rating, comment} =req.body;

    if(!movie_id || !author || !rating || !comment) {
        return res.status(400),json({error: 'Tutti i campi sono obbligatori'})
    }

    const sql = `
    INSERT INTO reviews (movie_id, author, rating, comment)
    VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [movie_id, author, rating, comment], (err, result)=>{
        if(err) {
            console.error('Errore inserimento recensione:', err);
            return res.status(500).json({error: 'Errore nel server'});
        }

        res.json({
            message: 'Recensione aggiunta con successo',
            review: {
                id: result.insertId,
                movie_id,
                author,
                rating,
                comment
            }
        })
    })
}

module.exports = { create }