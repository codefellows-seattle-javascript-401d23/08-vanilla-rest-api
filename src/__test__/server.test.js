'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

const testPort = 5000;
const mockResource = { title: 'test title', content: 'test content' };
let mockID = null;

beforeAll(() => server.start(testPort));
afterAll(() => server.stop());

describe('VALID request to the API', () => {
  describe('POST /api/v1/panda', () => {
    it('should respond with status 201 and create a new panda', () => {
      return superagent.post(`:${testPort}/api/v1/panda`)
        .send(mockResource)
        .then((res) => {
          mockID = res.body.id;
          expect(res.body.title).toEqual(mockResource.title);
          expect(res.body.content).toEqual(mockResource.content);
          expect(res.status).toEqual(201);
        });
    });
  });

  describe('GET /api/v1/panda', () => {
    it('should respond with the previously created panda', () => {
      return superagent.get(`:${testPort}/api/v1/panda?id=${mockID}`)
        .then((res) => {
          expect(res.body.title).toEqual(mockResource.title);
          expect(res.body.content).toEqual(mockResource.content);
          expect(res.status).toEqual(200);
        });
    });
  });
});
