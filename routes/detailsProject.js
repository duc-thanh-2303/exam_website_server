
const express = require('express');
const router = express.Router();
const controller = require('../controller/displayDetailsController');

router.get('/home/overview/:id', controller.getProjectById);

module.exports = router;
