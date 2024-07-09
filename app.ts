require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
import { getRepos, getRepoById, getReadme } from './controllers/controllers';

const app = express();

const port = process.env.PORT || 9090;

const server = app.listen(port, () => console.log(`Listening on ${port}`))

app.use(express.json());

app.get('/repositories', getRepos);

app.get('/repositorydetails/:id', getRepoById);

app.get('/readme/:owner/:repo', getReadme);

//invalid endpoint
app.all('/*', function (req: Request, res: Response) {
    res.status(404).send({message: 'Endpoint not found'});
})

//error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.message.includes('404')) {
        res.status(404).send({message: 'Not found'})}
    else {
        res.status(500).send('500: Internal server error')
    }  
  });

export { app, server };