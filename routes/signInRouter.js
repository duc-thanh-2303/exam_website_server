const express = require('express');
const router = express.Router();
const authController = require('../controller/signinController');
// const authMiddleware = require('../middleware/authenticate');

router.post('/login', authController.login);

module.exports = router;
