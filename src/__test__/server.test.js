'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

const testPort = 5000;
const mockResource = { name: 'Cat Face', favoriteFood: 'Beans' };
let mockId = null;

beforeAll(() => server.start(testPort));
afterAll(() => server.stop());

describe('VALID request to API', () => {
  describe('POST /api/v1/cat', () => {
    test('should respond with status 201 and create a new cat', () => {
      return superagent.post(`:${testPort}/api/v1/cat`)
        .send(mockResource)
        .then((res) => {
          mockId = res.body.id;
          expect(res.body.name).toEqual(mockResource.name);
          expect(res.body.favoriteFood).toEqual(mockResource.favoriteFood);
          expect(res.status).toEqual(201);
        });
    });
    describe('GET /api/v1/cat', () => {
      test('should respond with all cats', () => {
        return superagent.get(`${testPort}/api/v1/cat`)
          .then((res) => {
            console.log(mockId);
            console.log(res.body);
            // expect(res.body.name).toEqual(mockResource.name);
            // expect(res.body.favoriteFood).toEqual(mockResource.favoriteFood);
            // expect(res.status).toEqual(200);
          });
      });
    });
  });
});

// ?id=${mockId}
