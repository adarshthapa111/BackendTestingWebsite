const mongoose = require('mongoose');

const testCaseSchema = new mongoose.Schema({
    test_case_id: {type: String, required: true},
    description: {type: String, minlength: 10, required: true},
    featureId: {type: String, required: true},
    priority: {type: String, required: true},
    status: {type: String, required: true},
    createdBy: {type: String, ref: 'User'},
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()},
})

module.exports = mongoose.model('TestCase', testCaseSchema);