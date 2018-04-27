'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

const testPort = 5000;
const mockResource = { name: 'Hummingbird', type: 'Tiny Tiny', info: 'Cute but mean.' };
// let mockId = null;

beforeAll(() => server.start(testPort));
afterAll(() => server.stop());

// post first BEFORE you get, because you can't get something until it is created.

describe('VALID request to the API', () => {
  describe('POST /api/v1/bird', () => {
    it('should respond with status 201 and created a new bird', () => {
      return superagent.post(`:${testPort}/api/v1/bird`)
        .send(mockResource)
        .then((res) => {
          expect(res.body.name).toEqual(mockResource.name);
          expect(res.body.type).toEqual(mockResource.type);
          expect(res.body.info).toEqual(mockResource.info);
          expect(res.status).toEqual(201);
        });
      // if testing for errors, test them in a .catch block
    });
  });
  describe('GET /api/v1/bird?id', () => {
    it('should respond with status 200', () => {
      return superagent.post(`:${testPort}/api/v1/bird`)
        .send(mockResource);
      // .then((res) => {
      // mockId = res.body.id;
      // why do we need to reassign this?
      // Because the id is created when the item is created.
      // It won't have a value we can use until we send the POST request
      // and receive the response.
      // expect(res.body.name).toEqual(mockResource.name);
      // expect(res.body.type).toEqual(mockResource.type);
      // expect(res.body.info).toEqual(mockResource.info);
      // expect(res.status).toEqual(200);
      // });
    });
  });
});
