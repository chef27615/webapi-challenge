const express = require('express');

const Projects = require('./helpers/projectModel');

const actions = require('./action-router');



const projectRouter = express.Router();

projectRouter.use('/actions', actions);

projectRouter.get('/', async (req, res) => {
    try {
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

projectRouter.get('/:id', async (req, res) => {
    try {
        const project = await Projects.get(req.params.id)
        project ? res.status(200).json(project) : res.status(404).json({ message: "no such id available"})
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

projectRouter.get('/:id/actions',  async (req, res) => {
   try{
    const projectActions = await Projects.getProjectActions(req.params.id);
    if(projectActions){
        return res.status(200).json(projectActions)
    } else{ return res.status(404).json({ message: " nice try there, pumpkin"})}
   }catch(err){ res.status(500).json({ error: err});}
})


function getAction(req, res, next){
    const actionBody = req.params.actions;
    req.params.actions = actionBody;
    next()
}

projectRouter.use((req, res, next) => {
    res.status(404).json({ message: "Nice try, but, no"})
})
module.exports = projectRouter;