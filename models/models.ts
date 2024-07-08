
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

export {ApiResult, FinalResult};