import { Request, Response } from 'express';
import { ReposApiResult, ReposFinalResult, RepoByIdApiResult } from '../models/models';
import axios from "axios";

const request = axios.create({
    baseURL: "https://api.github.com/"
});

function getRepos (req: Request<{},{},{},{name: string}>, res: Response): Promise<ReposFinalResult> {
    return new Promise ((resolve, reject) => {
         const query = req.query.name;
            findRepos(query)
                .then((results) => {
                    res.status(200).send(results.items);
                 })
                .catch((err: Error) => {
                    reject(err)
                });
    });
}

function findRepos (query: string): Promise<ReposApiResult> {
    return new Promise ((resolve, reject) => {
        request.get(`/search/repositories?q=${query}`)
            .then((results) => {
                const returnResults: ReposApiResult = results.data;
                resolve(returnResults);
            })
            .catch((err: Error) => {
                reject(err)
            });
    })
}

function getRepoById (req: Request<{id: number}, {}, {}, {}>, res: Response): Promise<RepoByIdApiResult> {
    return new Promise ((resolve, reject) => {
        const params = req.params.id;
        findRepoById(params)
            .then((results) => {
                res.status(200).send(results)
            })
            .catch((err: Error) => {
                res.status(404).send({message: 'Repository not found'})
            })
    })
}

function findRepoById (query: number): Promise<RepoByIdApiResult> {
    return new Promise ((resolve, reject) => {
        request.get(`/repositories/${query}`)
            .then((results) => {
                const returnResults: RepoByIdApiResult = results.data;
                resolve(returnResults)
            })
            .catch((err: Error) => {
                reject(err)
            });
    } )
}

export {getRepos, findRepos, getRepoById, findRepoById};