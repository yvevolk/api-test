const { app, server } = require('../app');
const supertest = require('supertest');

afterAll(() => {
    server.close()
})
  
describe('invalid endpoint', () => {
    it('returns 404 and error message when endpoint does not exist', ()=> {
        return supertest(app).get('/abc123')
        .expect(404).then((res) => {
            expect(res.body.message).toBe('Endpoint not found')
        })
    })
})

describe('/repositories', () => {
    it('returns 200 when requesting repositories endpoint', () => {
        return supertest(app).get('/repositories')
        .expect(200)
    });
     //random gibberish that returns no repos
    it('returns empty array when query has no results', () => {
        return supertest(app).get('/repositories?name=tndksorn42352')
        .expect(200).then((res) => {
            expect(res.body.length).toBe(0)
        })
    })
    //search term "crowpilot" should only give 2 repos
    it('returns array of repo results when querying endpoint', () => {
        return supertest(app).get('/repositories?name=crowpilot')
        .expect(200).then((res) => {
            expect(res.body.length).toBe(2)
        })
    })
    //returned repo objects should include correct key value pairs
    it('returns repo objects with correct key value pairs', () => {
        return supertest(app).get('/repositories?name=crowpilot+frontend')
        .expect(200).then((res) => {
            expect(res.body.length).toBe(1);
            expect(res.body[0].name).toBe('crowpilot-frontend');
            expect(res.body[0].forks).toBe(1)
            expect(res.body[0].open_issues).toBe(0)
        })
    })
})

describe('/repositorydetails/:id', () => {
    it('returns 200 and single object when requesting repositorydetails endpoint with id', () => {
        return supertest(app).get('/repositorydetails/745559593')
        .expect(200)
    })
    //id does not exist
    it('returns 404 when requesting id that does not exist', () => {
        return supertest(app).get('/repositorydetails/11111111111111')
        .expect(404).then((res) => {
            expect(res.body.message).toBe('Repository not found')
        })
    })
    //returned repo objec should include correct key value pairs
    it('returns repo objects with correct key value pairs', () => {
        return supertest(app).get('/repositorydetails/745559593')
        .expect(200).then((res) => {
            expect(res.body.name).toBe('crowpilot-frontend');
            expect(res.body.forks).toBe(1);
            expect(res.body.open_issues).toBe(0);
        })
    })
})




// /repositories/{id}/readme