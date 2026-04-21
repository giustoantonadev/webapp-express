const express = require('express');
const router = express.Router();
const revewsController = require('../controllers/reviewsController');+


router.post('/', reviewsController.create);

module.exports = router;