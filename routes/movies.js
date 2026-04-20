const express = require('express');
const router = express.Router();
const db = require('../database/db');
const moviesController = require('../controllers/moviesController');

// Index
router.get('/', moviesController.index); 

// Show
router.get('/:id', moviesController.show);
module.exports = router;