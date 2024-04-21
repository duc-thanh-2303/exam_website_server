// controllers/passwordController.js
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const usersForm = require('../model/users');

async function resetPassword(email) {
  try {
    // Generate random password
    const newPassword = generateRandomPassword();

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password in the database
    await usersForm.findOneAndUpdate({ email }, { password: hashedPassword });

    // Send the new password to user's email
    sendEmail(email, newPassword);

    return 'Password reset successful.';
  } catch (error) {
    console.error(error);
    throw new Error('Internal server error');
  }
}

// Helper function to generate random password
function generateRandomPassword() {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  let password = '';
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

// Helper function to send email
function sendEmail(email, newPassword) {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., Gmail
    auth: {
      user: 'tika303103@gmail.com',
      pass: 'bxjijavsbwxnrooy'
    }
  });

  const mailOptions = {
    from: 'VDAS <tika303103@gmail.com>',
    to: email,
    subject: 'Password Reset',
    text: `Your new password is: ${newPassword}`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = { resetPassword };
