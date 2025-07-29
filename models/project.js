const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    requirement: {type: String, required: false},
    icon: {type: String, required: true},
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default:Date.now()},
})

module.exports = mongoose.model('Project', projectSchema);
