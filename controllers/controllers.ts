import { Request, Response } from 'express';
import { ApiResult, FinalResult} from '../models/models';
import axios from "axios";

const request = axios.create({
    baseURL: "https://api.github.com/search"
});

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

function findRepos (query: string): Promise<ApiResult> {
    return new Promise ((resolve, reject) => {
        request.get(`/repositories?q=${query}`)
            .then((results) => {
                const returnResults: ApiResult = results.data;
                resolve(returnResults);
            })
            .catch((err: Error) => {
                reject(err)});
    })
}

export {getRepos, findRepos};