
const express = require('express');
const router = express.Router();
const {submitFeedback} = require('../controller/examController');

router.post('/home/overview/:Id', submitFeedback);

module.exports = router;
