const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/users');

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).send('Invalid email or password');
        
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send('Invalid email or password');
        
        const token = jwt.sign({ _id: user._id, username: user.username, role: user.role }, 'secret_key');
        res.send(token);
    } catch (error) {
        console.error('Login failed:', error);
        res.status(500).send('Internal Server Error');
    }
};
