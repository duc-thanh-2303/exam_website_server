const express = require('express');
const router = express.Router();
const { getProjectOverview } = require('../controller/displayOverview')

router.get('/home/overview', getProjectOverview);

module.exports = router;