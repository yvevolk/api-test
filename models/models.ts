import axios from "axios";

const request = axios.create({
    baseURL: "https://api.github.com/search"
});

interface ApiResult {
    total_count: number;
    incomplete_results: boolean;
    items: object;
}

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


export {findRepos, FinalResult};