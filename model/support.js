const mongoose = require('mongoose')

const supportSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true
    },

    phone: {
        type: String,
        require: true
    },

    reason: {
        type: String,
        require: true
    },

    comment: {
        type: String,
        require: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

const supportForm = mongoose.model('supportForm', supportSchema)

module.exports = supportForm