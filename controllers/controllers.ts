import { Request, Response } from 'express';
import { findRepos, FinalResult} from '../models/models';

function getRepos (req: Request<{},{},{},{name: string}>, res: Response): Promise<FinalResult> {
    return new Promise ((resolve, reject) => {
         const query = req.query.name;
            findRepos(query)
                .then((results) => {
                    res.status(200).send(results.items);
                 })
                .catch((err: Error) => {
                    reject(err)});
    });
}

export {getRepos};