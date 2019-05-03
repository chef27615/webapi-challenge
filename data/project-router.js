const express = require('express');

const Projects = require('./helpers/projectModel');

const projectRouter = express.Router();

projectRouter.get('/', async (req, res) => {
    try{
        const projects = await Projects.get();
        res.status(200).json(projects);
    } catch(err){ res.status(500).json({ error: err});}
})

projectRouter.post('/', async (req, res) => {
    try {
        const newProject = await Projects.insert(req.body)
        const {name, description} = req.body;
        name && description ? res.status(200).json(newProject) : res.status(400),json({
            message: "name and description are both required for project"
        })
    } catch(err){ res.status(500).json({ error: err});}
})

projectRouter.delete('/:id', async (req, res) => {
    try {
        const id = await Projects.remove(req.params.id)
        id > 0 ? res.status(200).json({ message: "project deleted"}) : res.status(404).json({
            message: "We can not find project associated with this id"
        })
    } catch(err){ res.status(500).json({ error: err});}
})

projectRouter.put('/:id', async (req, res) => {
    try{
        const project = Projects.update(req.params.id, req.body);
        const {name, description} = req.body;
        name && description ? res.status(200).json(project) : res.status(404).json({
            message: "something is not right, try again"
        })
    } catch(err){ res.status(500).json({ error: err});}
})

projectRouter.get('/:id/actions', async (req, res) => {
    try {
        const projectId = Projects.getProjectActions(req.params.id);
        projectId ? res.status(200).json(action) : res.status(404).json({ message: "no project no action"})
    } catch(err){ res.status(500).json({ error: err});}
})

projectRouter.use((req, res, next) => {
    res.status(404).json({ message: "Nice try, but, no"})
})
module.exports = projectRouter;