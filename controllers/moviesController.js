const db = require('../database/db');

// INDEX
function index(req, res) {
    const sql = "SELECT * FROM movies";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Errore DB:", err);
            return res.status(500).json({ error: "Errore nel database" });
        }
        res.json(results);
    });
}

// SHOW
function show(req, res) {
    const id = req.params.id;
    const sql = "SELECT * FROM movies WHERE id = ?";

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Errore DB:", err);
            return res.status(500).json({ error: "Errore nel database" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "Film non trovato" });
        }

        res.json(results[0]);
    });
}

// CREATE (con upload locale)
function create(req, res) {
    const { title, year, director, genre, description } = req.body;

    // Se manca il file → errore
    if (!req.file) {
        return res.status(400).json({ error: "Poster mancante" });
    }

    // Percorso da salvare nel DB
    const posterPath = "/images/posters/" + req.file.filename;

    const sql = `
        INSERT INTO movies (title, year, director, genre, description, poster)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [title, year, director, genre, description, posterPath], (err, result) => {
        if (err) {
            console.error("Errore DB:", err);
            return res.status(500).json({ error: "Errore nel database" });
        }

        res.json({
            message: "Film aggiunto con successo",
            id: result.insertId
        });
    });
}

module.exports = { index, show, create };