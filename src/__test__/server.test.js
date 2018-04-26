'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

const testPort = 5000;
const mockResource = { title: 'test title', content: 'test content'};
let mockId = null; 

beforeAll(() => server.start(testPort));
afterAll(() => server.stop());

//In this lab, you MUST post first BEFORE you get

describe('VALID request to the API', () => {
  describe('POST /api/v1/tree', () => {
    it('should respond with status 201 and created a new tree', () => {
      return superagent.post(`:${testPort}/api/v1/tree`)
        .send(mockResource)
        .then((res) => {
          //console.log(res.body);
          mockId = res.body.id; // this is caching the crazy id we get back from uuid
          expect(res.body.title).toEqual(mockResource.title);
          expect(res.body.content).toEqual(mockResource.content);
          expect(res.status).toEqual(201);
        });
    });// it block
  });// inner describe block
  describe('GET /api/v1/tree', () => {
    it('should respond with status 201 and created a new tree', () => {
      return superagent.get(`:${testPort}/api/v1/tree`)
        .send(mockResource)
        .then((res) => {
          //console.log(res.body);
          expect(res.body.id).toEqual(mockId); // caching crazy id in global var above
          expect(res.body.title).toEqual(mockResource.title);
          expect(res.body.content).toEqual(mockResource.content);
          expect(res.status).toEqual(201);
        });
    });// it block
  });// inner describe block
});
describe('INVALID request to the API', () => {
  describe('GET /api/v1/tree?title=', () => {
    it('should err out with 400 status code for not sending id in query', () => {
      return superagent.get(`:${testPort}/api/v1/tree?title=`)
        .query({})
        .catch((err) => {
          expect(err.status).toEqual(400);
          expect(err).toBeTruthy();
        });
    });
  });//inner desc
  describe('GET /api/v1/tree?fake=fake', () => {
    it('should err out with 404 status code for id not found', () => {
      return superagent.get(`:${testPort}/api/v1/tree?fake=fake`)
        .query({})
        .catch((err) => {
          expect(err.status).toEqual(404);
          expect(err).toBeTruthy();
        });
    });
  });//inner desc
  describe('POST /api/v1/tree', () => {
    it('should err out with 400 status code for id not found', () => {
      return superagent.get(`:${testPort}/api/v1/tree?fake=fake`)
        .query({})
        .catch((err) => {
          expect(err.status).toEqual(404);
          expect(err).toBeTruthy();
        });
    });
  });//inner desc
 });


// GET: test 404, it should respond with 'not found' for valid requests made with an id that was not found
// GET: test 400, it should respond with 'bad request' if no id was provided in the request
// GET: test 200, it should contain a response body for a request made with a valid id
// POST: test 400, it should respond with 'bad request' if no request body was provided or the body was invalid
// POST: test 200, it should respond with the body content for a post request with a valid body