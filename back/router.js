const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.post('/add-score', controller.addNewScore);

module.exports = router;