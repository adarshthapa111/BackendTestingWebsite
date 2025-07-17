const Joi = require('joi');

const featureSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().min(5).required(),
    icon: Joi.string().required()
})

//Validation Schema for Test Case 
const testCaseSchema = Joi.object({
  test_case_id: Joi.string().required(),
  description: Joi.string().min(10).required(),
  featureId: Joi.string().required(),
  priority: Joi.string().required(),
  status: Joi.string().required(),
})

module.exports = {featureSchema, testCaseSchema};