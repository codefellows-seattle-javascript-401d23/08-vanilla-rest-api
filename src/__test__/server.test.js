'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

const testPort = 5000;
const mockCat = { name: 'Cat Face', favoriteFood: 'Beans' };
let mockId = null;


describe('VALID request to API', () => {
  beforeAll(() => server.start(testPort));
  afterAll(() => server.stop());
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
    });
    describe('GET /api/v1/cat', () => {
      test('should respond with previously created cat', () => {
        return superagent.get(`:${testPort}/api/v1/cat?id=${mockId}`)
          .then((res) => {
            expect(res.body.name).toEqual(mockCat.name);
            expect(res.body.favoriteFood).toEqual(mockCat.favoriteFood);
            expect(res.status).toEqual(200);
          });
      });
    });
  });
});

//
