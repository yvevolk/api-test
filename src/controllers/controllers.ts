import { NextFunction, Request, Response } from 'express';
import { ReposApiResult, ReposFinalResult, RepoByIdApiResult, ReadmeApiResult } from '../models/models.ts';
import axios from "axios";
import base64 from "js-base64";

const request = axios.create({
    baseURL: "https://api.github.com/",
    //comment out line below if not using auth token
    headers: { Authorization: `Bearer ${process.env.AUTH_TOKEN}`}
});

function getRepos (req: Request<{},{},{},{name: string}>, res: Response, next:NextFunction): Promise<ReposFinalResult> {
    return new Promise ((resolve, reject) => {
         const query = req.query.name;
            findRepos(query)
                .then((results) => {
                    res.status(200).send(results.items);
                 })
                .catch((err: Error) => {
                    next(err);
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
                reject(err);
            });
    })
}

function getRepoById (req: Request<{id: number}, {}, {}, {}>, res: Response, next: NextFunction): Promise<RepoByIdApiResult> {
    return new Promise ((resolve, reject) => {
        const params = req.params.id;
        findRepoById(params)
            .then((results) => {
                res.status(200).send(results)
            })
            .catch((err: Error) => {
                next(err);
            })
    })
}

function findRepoById (query: number): Promise<RepoByIdApiResult> {
    return new Promise ((resolve, reject) => {
        request.get(`/repositories/${query}`)
            .then((results) => {
                const returnResults: RepoByIdApiResult = results.data;
                resolve(returnResults);
            })
            .catch((err: Error) => {
                reject(err);
            });
    } )
}

function getReadme (req: Request<{owner: string, repo: string}, {}, {}, {}>, res: Response, next: NextFunction): Promise<ReadmeApiResult> {
    {
        return new Promise ((resolve, reject) => {
           const owner: string = req.params.owner;
           const repo: string = req.params.repo;
           findReadme(owner, repo)
                .then((results) => {
                    results.content = base64.decode(results.content);
                    res.status(200).send(results);
                })
                .catch((err: Error) => {
                    next(err);
                })
        })
    }
}

function findReadme (owner: string, repo: string): Promise<ReadmeApiResult> {
    return new Promise ((resolve, reject) => {
        request.get(`/repos/${owner}/${repo}/readme`)
            .then((results) => {
                resolve(results.data);
            })
            .catch((err: Error) => {
                reject(err);
            });
    })
}

export { getRepos, findRepos, getRepoById, findRepoById, getReadme };