const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');
const upload = require('../middleware/upload'); // ⭐ IMPORTANTE

// Index
router.get('/', moviesController.index);

// Create (con upload file locale)
router.post('/', upload.single("poster"), moviesController.create);

// Show
router.get('/:id', moviesController.show);

module.exports = router;