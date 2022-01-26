const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.get('/get-all-scores', controller.getAllscores)
router.post('/add-score', controller.addNewScore);

module.exports = router;