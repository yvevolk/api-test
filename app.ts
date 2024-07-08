require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
import { getRepos, getRepoById } from './controllers/controllers';

const app = express();

const port = process.env.PORT || 9090;

const server = app.listen(port, () => console.log(`Listening on ${port}`))

app.use(express.json());

app.get('/repositories', getRepos);

app.get('/repositorydetails/:id', getRepoById);

app.all('/*', function (req: Request, res: Response) {
    res.status(404).send({message: 'Endpoint not found'});
})

export {app, server};