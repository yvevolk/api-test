
interface ReposApiResult {
    total_count: number;
    incomplete_results: boolean;
    items: object;
}

interface ReposFinalResult {
    id: number,
    name: string,
    private: boolean,
    owner: object,
    description: string,
    url: string,
    size: number,
    language: string,
    forks_count: number,
    open_issues_count: number
}

interface RepoByIdApiResult {
    id: number,
    name: string,
    private: boolean,
    owner: object,
    description: string,
    url: string,
    size: number,
    language: string,
    forks_count: number,
    open_issues_count: number
}

export {ReposApiResult, ReposFinalResult, RepoByIdApiResult};