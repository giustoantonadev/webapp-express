function errorHandler(err, req, res, next){+
    console.error('Errore:', err);
    res.status(500).json({ error: 'Errore interno del server' });
}

module.exports = errorHandler;