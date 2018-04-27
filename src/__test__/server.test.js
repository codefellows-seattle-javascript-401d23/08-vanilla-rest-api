'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

const testPort = 5000;
const mockResource = { title: 'test title', content: 'test content' };
let mockId = 5;

beforeAll(() => server.start(testPort));
afterAll(() => server.stop());

describe('VALID request to the API', () => {
  describe('POST /api/v1/catz', () => {
    it('should respond with status 201 and created a new catz', () => {
      return superagent.post(`:${testPort}/api/v1/catz`)
        .send(mockResource)
        .then((res) => {
          mockId = res.body.id;
          expect(res.body.title).toEqual(mockResource.title);
          expect(res.body.content).toEqual(mockResource.content);
          expect(res.status).toEqual(201);
        });
    });
  });

  describe('GET /api/v1/catz', () => {
    it('should respond with the previously created catz', () => {
      return superagent.get(`:${testPort}/api/v1/catz?id=${mockId}`)
        .query({})
        .then((res) => {
          expect(res.body.title).toEqual(mockResource.title);
          expect(res.body.content).toEqual(mockResource.content);
          expect(res.status).toEqual(200);
        });
    });
  });
});


describe('INVALID request to the API', () => {
  describe('GET /errors', () => {
    it('should err out with 404 status code for reuest with a bad id', () => {
      return superagent.get(`:${testPort}/api/v1/catz?id=3`)
        .query({})
        .catch((err) => {
          expect(err.status).toEqual(404);
          expect(err).toBeTruthy();
        });
    });


    it('should err out with 404 status code with a bad route', () => {
      return superagent.get(`:${testPort}/api/v1/cowsay`)
        .query({})
        .catch((err) => {
          expect(err.status).toEqual(404);
          expect(err).toBeTruthy();
        });
    });

    it('should err out with 400 status code for result with no id', () => {
      return superagent.get(`:${testPort}/api/v1/catz?id= `)
        .query({})
        .catch((err) => {
          expect(err.status).toEqual(404);
          expect(err).toBeTruthy();
        });
    });
  });
});
