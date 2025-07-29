const express = require('express');
const router = express.Router();
const {projectSchema} = require('../utils/validate.js');
const Project = require('../models/project');

router.post('/', async(req, res)=> {
    try{
        console.log(req);
        const {error} = projectSchema.validate(req.body);
        if(error){
            return res.status(400).json({
                error: error.details[0].message
            })
        }
        const project = new Project({
            name: req.body.name,
            description: req.body.description,
            icon: req.body.icon,
            requirement: req.body.requirement,
            createdAt: Date.now(),
        })
        await project.save();
        res.status(200).json(project);
    }catch(error){
        console.error('Error creating feature', error.message);
        res.status(500).json({
            error: 'Server Error',
            details: error.message,
        })
    }
})

router.delete('/:id', async(req, res)=> {
    try{
        const project = await Project.findByIdAndDelete(req.params.id);
        if(!project) {
            res.status(404).json({
                error: "Project not found!"
            })
        }
        res.status(200).json({
            message: 'Project deleted sucessfully'
        });
    }catch(error){
        res.status(404).json({
            error: "server error",
            details: error.message
        })
    }
})

router.put('/', async(req, res)=>{
    try{
        
    }catch(error){
        res.status(404).json({
            error: "Server error",
            details: error.message,
        })
    }
})

router.get('/', async(req, res)=> {
    try{
        const projects = await Project.find();
        res.status(200).json(projects);
    }catch(error) {
        res.status(404).json({
        error: "Server error",
        details: error.message
        })
    }
})

module.exports = router;