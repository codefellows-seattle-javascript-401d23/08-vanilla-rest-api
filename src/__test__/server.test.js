
'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

const testPort = 5000;
const mockResource = { title: 'test llama title', content: 'test llama content' };
let mockId = 5;

beforeAll(() => server.start(testPort));
afterAll(() => server.stop());

// In this lab, you MUST post first BEFORE you get
describe('VALID request to the API', () => {
  describe('POST /api/v1/llama', () => {
    it('should respond with status 201 and create a new llama', () => {
      return superagent.post(`:${testPort}/api/v1/llama`)
        .send(mockResource)
        .then((res) => {
          mockId = res.body.id;
          expect(res.body.title).toEqual(mockResource.title);
          expect(res.body.content).toEqual(mockResource.content);
          expect(res.status).toEqual(201);
        });

    });
  });

});

describe('GET /api/v1/llama', () => {
  it('should respond with the a previously created llama', () => {
    // console.log(mockId, 'MOCK ID IN GET BLOCK')
    return superagent.get(`:${testPort}/api/v1/llama?id=${mockId}`)
      // .query({}) // not sure about this....
      .then((res) => {
        // console.log(res.body);
        expect(res.body.title).toEqual(mockResource.title);
        expect(res.body.content).toEqual(mockResource.content);
        expect(res.status).toEqual(200);
      });
  });
});

describe('INVALID request to the API', () => {
  describe('GET /api/v1/cowsay', () => {
    it('should err out with 404 status code for not sending text in query', () => {
      return superagent.get(`:${testPort}/api/v1/llama?id=23`)
        .query({})
        // .then(() => {})
        .catch((err) => {
          expect(err.status).toEqual(404);
        });
    });
  });
});

