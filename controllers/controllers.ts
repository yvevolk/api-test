import { Request, Response } from 'express';
import { findRepos } from '../models/models';

interface FinalResult {
    id: number,
    name: string,
    owner: string,
    private: boolean,
    description: string,
    language: string,
    size: number,
    forks: number,
    open_issues: number,
    url: string
}

function getRepos (req: Request, res: Response): Promise<FinalResult> {
    return new Promise ((resolve, reject) => {
         const query = req.query.name;
         findRepos(`${query}`)
         .then((results) => {
        res.status(200).send(results.items);
    })
    .catch((err: Error) => {
        reject(err)})
    })
   
}

export {getRepos};