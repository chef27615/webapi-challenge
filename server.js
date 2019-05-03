const express = require('express');
const actionRouter = require('./data/action-router');
const projectRouter = require('./data/project-router');

const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());

// server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);

server.get('/', (req, res) => {
    res.send('<h2>Let\'s get the data</h2>')
})

module.exports = server;