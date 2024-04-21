// routes/passwordRoutes.js
const express = require('express');
const router = express.Router();
const { resetPassword } = require('../controller/resetPassController');

router.post('/reset-password', async (req, res) => {
  const { email } = req.body;

  try {
    const message = await resetPassword(email);
    res.status(200).send(message);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
