import { NextFunction, Request, Response } from 'express';
import {findRepos} from '../models/models';

//need to do promise in models next

function getRepos (req: Request, res: Response, next: NextFunction) {
    findRepos('thing')
    .then((results: Object) => {
         res.status(200).send(results);
    })
   .catch((err: Error) => {next(err)})
}

export {getRepos};