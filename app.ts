require('dotenv').config();
import express, { Request, Response } from 'express';
import { getRepos } from './controllers/controllers';

const app = express();

const port = process.env.PORT || 9090;

const server = app.listen(port, () => console.log(`Listening on ${port}`))

app.use(express.json());

app.get('/repositories', getRepos);

app.all('/*', function (req: Request, res: Response) {
    res.status(404).send({message: 'endpoint does not exist'});
})


export {app, server};