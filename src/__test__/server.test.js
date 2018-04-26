'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

const testPort = 5000;
const mockResource = { title: 'test title', content: 'test content' };
let mockID = null;


beforeAll(() => server.start(testPort));
// before all the tests run do this...
afterAll(() => server.stop());
// after all the tests run do this..


// remember to POST before you GET
describe('VALID request to the API', () => {
  describe('POST /api/v1/llama', () => {
    it('should respond with status 201 and creat a new llama')
    .send(mockResource)
    .then((res) => {
      mockID = res.body.id;
      expect(res.body.title).toEqual(mockResource.title);
      expect(res.body.content).toEqual(mockResource.content);
      expect(res.status).toEqual(201);
    });
  });
});

describe('GET /api/v1/llama', () => {
  it('should respond with the previously created llama', () => {
    // console.log(mock ID in the GET block);
    return superagent.get(`:${testPort}/api/v1/llama?id=${mockId}`)
    .then((res) => {
      expect(res.body.title).toEqual(mockResource.title);
      expect(res.body.content).toEqual(mockResource.content);
      expect(res.status).toEqual(200);
    });
  });
});
