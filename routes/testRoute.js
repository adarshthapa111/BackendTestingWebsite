const express = require('express');
const router = express.Router();
const TestCase = require('../models/testCase');
const {testCaseSchema} = require('../utils/validate');

router.post('/', async(req, res)=> {
  try{ 
    const {error} = testCaseSchema.validate(req.body);
    if(error) {
      return res.status(400).json({
        error: error.details[0].message
      })
    }
    const testCase = new TestCase({
      test_case_id: req.body.test_case_id,
      description: req.body.description,
      featureId: req.body.featureId,
      priority: req.body.priority,
      status: req.body.status,
    })

    await testCase.save();
    res.status(201).json(testCase);
  }catch(error) {
    console.error('Error creating Test Case:', error); // Log full error object
    res.status(500).json({
      error: 'Server Error',
      details: error.message, // Include error message in response
    });
  }
})

router.put('/:id', async(req, res) => {
  try {
    const {error} = testCaseSchema.validate(req.body);
    if(error) {
      return res.status(400).json({
        error: error.details[0].message
      })
    }
    const testCase = await TestCase.findOneAndUpdate({_id: req.params.id},
      {
        test_case_id: req.body.test_case_id,
        description: req.body.description,
        featureId: req.body.featureId,
        status: req.body.status,
        priority: req.body.priority,
      }, 
      {new: true, runValidators: true}
    )
    if(!testCase) {
      return res.status(404).json({
        error: "Test case not found"
      })
    }
    res.status(200).json(testCase);
  }catch(error) {
  res.status(500).json({
      error: 'Server Error',
      details: error.message,
    });
  }
})

router.delete('/:id', async(req, res)=>{
  try{
    const testCase = await TestCase.findByIdAndDelete(req.params.id);
    if(!testCase) {
      res.status(404).json({
        error: "Test case not found!"
      })
    }
    
    res.status(200).json({
      message: "Test case delete sucessfully",
      deletedTestCase: testCase
    })
  }catch(error){
    res.status(500).json({
      error: 'Server Error',
      details: error.message,
    });
  }
})

router.get('/', async(req, res)=> {
  try{
    const testCases = await TestCase.find().lean();
    res.status(200).json(testCases);
  }catch(error){
    res.status(404).json({
      error: "Server error",
      details: error.message
    })
  }
})

module.exports = router;