const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');+


router.post('/', reviewsController.create);

module.exports = router;