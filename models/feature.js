const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    icon: {type: String, required: true},
    projectId: {type: String, required: true},
    testCounts: {
        passed: {type: Number, default: 0},
        pending: {type: Number, default: 0},
        failed: {type: Number, default: 0},
    },
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()},
})

module.exports = mongoose.model('Feature', featureSchema);