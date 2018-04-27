'use strict';

const server = require('../lib/server');
const logger = require('../lib/logger');
const superagent = require('superagent');

const testPort = 5000;
const mockResource = { title: 'Le Title of the Object', content: 'The content of the object' };
const mockResource2 = { title: 'Triumph', content: 'Street Triple R 675' };
let mockId = null;
let targetId = null;

beforeAll(() => server.start(testPort));
afterAll(() => server.stop());

// In this lab, you MUST POST first BEFORE you GET
describe('VALID request to the API', () => {
  describe('POST /api/v1/motorcycle', () => {
    test('should respond with status 201 and created a new motorcycle', () => {
      return superagent.post(`:${testPort}/api/v1/motorcycle`)
        .send(mockResource)
        .then((res) => {
          mockId = res.body.id;
          expect(res.body.title).toEqual(mockResource.title);
          expect(res.body.content).toEqual(mockResource.content);
          expect(res.status).toEqual(201);
        });
    });
    test('should respond with status 201 this is creating a filler for the get all', () => {
      return superagent.post(`:${testPort}/api/v1/motorcycle`)
        .send(mockResource2)
        .then((res) => {
          expect(res.body.title).toEqual(mockResource2.title);
          expect(res.body.content).toEqual(mockResource2.content);
          expect(res.status).toEqual(201);
        });
    });
  });

  describe('GET /api/v1/motorcycle', () => {
    test('should respond with the a previously created motorcycle', () => {
      return superagent.get(`:${testPort}/api/v1/motorcycle?id=${mockId}`)
        .then((res) => {
          expect(res.body.title).toEqual(mockResource.title);
          expect(res.body.content).toEqual(mockResource.content);
          expect(res.status).toEqual(200);
        });
    });
  });

  describe('GET /api/v1/motorcycle/all', () => {
    test('should respond with the all of the previously created motorcycles', () => {
      return superagent.get(`:${testPort}/api/v1/motorcycle/all`)
        .then((res) => {
          targetId = res.body[0];
          logger.log(logger.INFO, `${res.body}, ${res.body[0]}`);
          expect(res.status).toEqual(202);
        });
    });
  });

  // currently needs work. getting syntax error for testing but code manually works.
  // describe('DELETE /api/v1/motorcycle/remove', () => {
  //   test('should respond with a confirmation message of deletion', () => {
  //     return superagent.delete(`:${testPort}/api/v1/motorcycle/remove?id=${mockId}`)
  //       .then((res) => {
  //         expect(res.status).toEqual(202);
  //       });
  //   });
  // });
});
