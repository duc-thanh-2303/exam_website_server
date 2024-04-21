// routes/exportRoutes.js
const express = require('express');
const router = express.Router();
const { exportToExcel } = require('../controller/exportController');

router.get('/dashboard/report', exportToExcel);

module.exports = router;
