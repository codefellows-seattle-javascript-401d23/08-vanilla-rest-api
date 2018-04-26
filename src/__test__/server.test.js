'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

const testPort = 5000;
const mockCat = { name: 'Beans', favoriteFood: 'Baked beans' };
let mockId = null;

beforeAll(() => server.start(testPort));
afterAll(() => server.stop());

describe('VALID request to API', () => {
  describe('POST /api/v1/cat', () => {
    test('should respond with status 201 and create a new cat', () => {
      return superagent.post(`:${testPort}/api/v1/cat`)
        .send(mockCat)
        .then((res) => {
          mockId = res.body.id;
          expect(res.body.name).toEqual(mockCat.name);
          expect(res.body.favoriteFood).toEqual(mockCat.favoriteFood);
          expect(res.status).toEqual(201);
        });
    }); // valid POST
    describe('GET /api/v1/cat', () => {
      test('should respond with previously created cat', () => {
        return superagent.get(`:${testPort}/api/v1/cat?id=${mockId}`)
          .then((res) => {
            expect(res.body.name).toEqual(mockCat.name);
            expect(res.body.favoriteFood).toEqual(mockCat.favoriteFood);
            expect(res.status).toEqual(200);
          });
      });
    }); // valid GET ONE
    describe('GET ALL /api/v1/cats', () => {
      test('should respond with all cats', () => {
        return superagent.get(`:${testPort}/api/v1/cats`)
          .then((res) => {
            expect(res.body).toEqual([mockId]);
            expect(res.status).toEqual(200);
          });
      });
    }); // valid GET ALL
  });
});

//
