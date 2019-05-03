const express = require('express');
const Actions = require('./helpers/actionModel');
const Projects = require('./helpers/projectModel');
const actionRouter = express.Router();

actionRouter.get('/', async (req, res) => {
    const actions = await Actions.get(req.params.id)
    if(actions){ return res.status(200).json(actions)}
})

actionRouter.post('/', checkLength, async (req, res) => {
    
    try{
        console.log(req.body)
        const newAction = await Actions.insert(req.body);
        const { project_id, description, notes } = req.body;
        if(project_id && description.length  &&notes){
            return res.status(200).json(newAction)
        }else{ return res.status(400).json({ message: "try again"})}
    } catch(err){ res.status(500).json({errorMessage: err})}
    
})

actionRouter.delete('/:id', async(req, res) => {
    try{
        const id = await Actions.remove(req.params.id);
        if(id){ 
            return res.status(200).json({ message: "action deleted"})
        }else{
            return res.status(404).json({ message: "id not available"})
        }
    } catch(err){ res.status(500).json({errorMessage: err})}
})

actionRouter.put('/:id', async(req, res) => {
    try{
        const updatedAction = await Actions.update(req.params.id, req.body);
        const { project_id, description, notes } =req.body;
        if(project_id&&description&&notes){
            return res.status(200).json(updatedAction)
        }else{ return res.status(400).json({ message: "try again"})}
    } catch(err){ res.status(500).json({errorMessage: err})}
})

function checkLength(req, res, next){
    const description = req.body.description
    
    if( description.length > 128 ){
        return res.status(400).json({ message: "too long"})
    }
    next();
}
actionRouter.use((req, res, next) => {
    res.status(404).json({ message: "looking for some action? Not here"})
})
module.exports = actionRouter;