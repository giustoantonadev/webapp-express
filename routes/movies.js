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

module.exports = router;