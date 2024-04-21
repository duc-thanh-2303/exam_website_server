const express = require('express');
const router = express.Router();
const userController = require('../controller/displayUser');
const { registerUser } = require('../controller/registerController');

router.post('/dashboard/add-account', registerUser);

router.get('/dashboard/account', userController.getUsers);

module.exports = router;