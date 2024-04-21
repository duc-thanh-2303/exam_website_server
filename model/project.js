const mongoose = require('mongoose')

const projectsSchema = new mongoose.Schema({
    projectName: {
        type: String,
        require: true
    },

    author: {
        type: String,
        require: true
    },

    summary: {
        type: String,
        require: true
    },

    detail: {
        type: String,
        require: true
    },

    mainImage: {
        type: String,
        require: true
    },

    images: [
        String
        // require: true    
    ],

    video: {
        type: String,
        require: false
    },

    point: {
        type: Number,
        default: 0
    },

    comment: {
        type: String,
        require: false
    }
})

const projectsForm = mongoose.model('projectsForm', projectsSchema)

module.exports = projectsForm