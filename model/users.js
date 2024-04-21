const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },

    password: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true,
        unique: true
    },

    fullName: {
        type: String,
        require: true
    },

    gender: {
        type: String,
        enum: ['male', 'female'],
        require: true
    },

    country: {
        type: String,
        require: true
    },

    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
})

const usersForm = mongoose.model('usersForm', usersSchema)

module.exports = usersForm