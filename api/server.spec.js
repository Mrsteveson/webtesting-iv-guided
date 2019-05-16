const request = require('supertest');

const server = require('./server.js');


describe('server', () => {

    it('sets the environment to testing', () => {
        expect(process.env.DB_ENV).toBe('testing')
    });

    //testing manually.
    //open client(postman), make a request and inspect response.
    describe('Get/', () => {
       
        //returns a promise
        it('should return 200 OK', () => {
            return request(server)
            .get('/')
            .expect(200);
        });

        //uses async/await
        it('using the squad (async/await)', async () => {
            const res = await request(server).get('/');
            expect(res.status).toBe(200);
        });

        // uses the done cb
        it('using done cb, checking application/json', done => {
            request(server)
            .get('/')
            .then(res => {
                expect(res.type).toBe('application/json');
                done();
            });
        });

        it('should return { api: "up" }', () => {
            const expected = { api: 'up' }

            request(server).get('/').then(res => {
                expect(res.body).toEqual(expected)
            })
        })
    });
});