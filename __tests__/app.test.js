const { app, server } = require('../app');
const supertest = require('supertest');

afterAll(() => {
    server.close()
})
  
describe('invalid endpoint', () => {
    it('returns 404 and error message when endpoint does not exist', ()=> {
        return supertest(app).get('/abc123')
        .expect(404).then((res) => {
            expect(res.body.message).toBe('endpoint does not exist')
        })
    })
})

describe.only('/repositories', () => {
    it('returns 200 when requesting repositories endpoint', () => {
        return supertest(app).get('/repositories')
        .expect(200)
    });
     //random gibberish that returns no repos
    it.only('returns empty array when query has no results', () => {
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

})