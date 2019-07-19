const express = require('express');
const dbConnect = require('./data/helpers/project-model');
const server = express();

const PORT = 3000;
server.use(express.json());


//Routes
server.get('/api/projects/:id', async ( req, res) => {
    try {
        const project = await dbConnect.getProjectById(req.params.id);
        res.status(201).send(project);

    } catch (error) {
        res.status(501).json({
            message: error.toString()
        })
    }
})

server.post('/api/projects', async(req, res) => {
    try {
        const project = await dbConnect.addProject(req.body);
        res.status(201).json(project);
    } catch(error) {
        res.status(501).json({
            message: error.toString()
        })
    }
})

server.post('/api/projects/:id/action', async(req, res) => {
    const { id } = req.params;
    const {description, notes} = req.body;
    try {
        const action = await dbConnect.addAction({description, notes, "project_id": id });
        res.status(201).json(action);
    } catch(error) {
        res.status(501).json({
            message: error.toString()
        })
    }
})

server.put('/api/projects/:id', async ( req, res) => {
    try {
        const project = await dbConnect.updateProject(req.params.id, req.body);
        res.status(201).send(project);

    } catch (error) {
        res.status(501).json({
            message: error.toString()
        })
    }
})

server.delete('/api/projects/:id', async ( req, res) => {
    try {
        const project = await dbConnect.deleteProject(req.params.id);
        res.status(201).send(project);

    } catch (error) {
        res.status(501).json({
            message: error.toString()
        })
    }
})

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});