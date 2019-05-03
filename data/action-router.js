const express = require('express');
const Actions = require('./helpers/actionModel');
const Projects = require('./helpers/projectModel');
const actionRouter = express.Router();


actionRouter.get('/:id', function(req, res, next){
    try{
        let projectId = req.params.project_id;
        const actions = Actions.get(projectId);
        actions ? res.status(200).json(actions) : res.status(404).json({ message: "nothing here"})
    } catch(err){ res.status(500).json({ message: err})}
})

// actionRouter.get('/', (req, res) => {
//     try {
//         const action = Actions.get();
//         action ? res.status(200).json(action) : res.status(404).json({ message: "no project no action"})
//     } catch(err){ res.status(500).json({message: "The actions can not be retrieved"})}
// })

actionRouter.post('/', async (req, res) => {
    try{
        const action = await Actions.insert(req.body);
        const { project_id, description, notes} = req.body;
        project_id && description && notes ? res.status(200).json(action) : res.status(400).json({ message: "some of the required fields are not filled out, please try again"})
    } catch(err){ res.status(500).json({message: "The actions can not be retrieved"})}
})

actionRouter.delete('/:id', async (req, res) => {
    try {
        const id =  await Actions.remove(req.params.id);
        id > 0 ? res.status(200).json({ message: "action deleted"}) : res.status(404).json({ message: " can not find the action by this id"})  
    } catch(err){ res.status(500).json({message: "The actions can not be retrieved"})}
})

actionRouter.put('/:id', async (req, res) => {
   try{
    const action =  await Actions.update(req.body)
    const { project_id, description, notes } =req.body;
    project_id && description && notes ? res.status(200).json(action) : res.status(400).json({ message: "something is not right"})
   } catch(err){ res.status(500).json({message: "The actions can not be retrieved"})}
})


actionRouter.use((req, res, next) => {
    res.status(404).json({ message: "looking for some action? Not here"})
})
module.exports = actionRouter;