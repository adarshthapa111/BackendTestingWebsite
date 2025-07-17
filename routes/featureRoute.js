const express = require('express');
const router = express.Router();
const {featureSchema} = require('../utils/validate.js');
const Feature = require('../models/feature.js');
const TestCase = require('../models/testCase.js');

router.post('/', async(req, res) => {
    try{
        const { error } = featureSchema.validate(req.body);
        if(error) {
            return res.status(400).json({
                error: error.details[0].message
            })
        }
        const feature = new Feature({
            name: req.body.name,
            description: req.body.description,
            icon: req.body.icon,
            createdBy: req.body.createdBy,
        })
        await feature.save();
        res.status(201).json(feature)
    }catch(error) {
        console.error('Error creating feature', error.message);
        res.status(500).json({
            error: 'Server Error',
            details: error.message,
        })
    }
})

router.delete('/:id', async(req, res)=>{
    try{
        const feature = await Feature.findByIdAndDelete(req.params.id);
        if(!feature) {
            res.status(404).json({
            error: "Feature not found!"
            })
        }
        await TestCase.deleteMany({ featureId: req.params.id });
        res.status(200).json({
            message: "Feaure deleted sucessfully",
            deletedFeature: feature 
        })
    }catch(error){
        res.status(404).json({
        error: "Server error",
        details: error.message
        })
    }
})


router.get('/', async(req, res)=> {
    try{
        const features = await Feature.find();
        res.status(200).json(features);
    }catch(error) {
        res.status(404).json({
        error: "Server error",
        details: error.message
        })
    }
})

module.exports = router;
