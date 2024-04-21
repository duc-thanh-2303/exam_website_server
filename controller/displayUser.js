const usersForm = require('../model/users');

exports.getUsers = async (req, res) => {
  try {
    const users = await usersForm.find({}, 'username email country fullName role');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users: ', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
