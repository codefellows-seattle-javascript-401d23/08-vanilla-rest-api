'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

const testPort = 5000;
const mockCat = { name: 'Beans', favoriteFood: 'Baked beans' };
let mockId = null;

beforeAll(() => server.start(testPort));
afterAll(() => server.stop());

describe('VALID requests to API', () => {
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
  }); // valid POST
  describe('GET /api/v1/cat?id=id', () => {
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
  describe('UPDATE /api/v1/cat?id=id', () => {
    test('should respond with status 200 and return updated cat', () => {
      const updatedMockCat = { id: mockId, name: 'Beans', favoriteFood: 'Pizza' };
      return superagent.put(`:${testPort}/api/v1/cat`)
        .send(updatedMockCat)
        .then((res) => {
          expect(res.body.id).toEqual(mockId);
          expect(res.body.name).toEqual(updatedMockCat.name);
          expect(res.body.favoriteFood).toEqual(updatedMockCat.favoriteFood);
          expect(res.status).toEqual(200);
        });
    });
  }); // valid UPDATE
  describe('DELETE /api/v1/cat', () => {
    test('Should respond with 204 and empty body', () => {
      return superagent.del(`:${testPort}/api/v1/cat?id=${mockId}`)
        .then((res) => {
          expect(res.status).toEqual(204);
        });
    });
  }); // valid DELETE
}); // closing VALID requests

describe('BAD requests to API', () => {
  describe('POST /api/v1/cat', () => {
    test('should respond with 400, no body', () => {
      return superagent.post(`:${testPort}/api/v1/cat`)
        .send({})
        .then(() => {})
        .catch((err) => {
          expect(err).toBeTruthy();
          expect(err.message).toEqual('Bad Request');
          expect(err.status).toEqual(400);
        });
    });
  }); // bad POST
  describe('GET /api/v1/cat invalid and no id', () => {
    test('should respond with 404', () => {
      return superagent.get(`:${testPort}/api/v1/cat?id=4`)
        .then(() => {})
        .catch((err) => {
          expect(err.message).toEqual('Bad request');
          expect(err).toBeTruthy();
          expect(err.status).toEqual(404);
        });
    }); // bad GET ONE
    test('should respond with 400', () => {
      return superagent.get(`:${testPort}/api/v1/cat`)
        .then(() => {})
        .catch((err) => {
          expect(err).toBeTruthy();
          expect(err.status).toEqual(400);
        });
    });
  }); // bad GET ONE
  describe('GET ALL /api/v1/BADSCHEMA', () => {
    test('should respond with 404', () => {
      return superagent.get(`:${testPort}/api/v1/BADSCHEMA`)
        .then(() => {})
        .catch((err) => {
          expect(err).toBeTruthy();
          expect(err.status).toEqual(404);
        });
    });
  }); // bad GET ALL
  describe('UPDATE /api/v1/cat no id', () => {
    test('should respond with 400', () => {
      return superagent.put(`:${testPort}/api/v1/cat`)
        .send({ name: 'Beans', favoriteFood: 'Pizza' })
        .then(() => {})
        .catch((err) => {
          expect(err).toBeTruthy();
          expect(err.status).toEqual(400);
        });
    });
  }); // bad UPDATE no id
  describe('UPDATE /api/v1/cat bad id', () => {
    test('should respond with 404', () => {
      return superagent.put(`:${testPort}/api/v1/cat`)
        .send({ id: 4, name: 'Beans', favoriteFood: 'Pizza' })
        .then(() => {})
        .catch((err) => {
          expect(err).toBeTruthy();
          expect(err.status).toEqual(404);
        });
    });
  }); // bad UPDATE bad id
  describe('DELETE /api/v1/cat no id', () => {
    test('should return status 400', () => {
      return superagent.del(`:${testPort}/api/v1/cat`)
        .then(() => {})
        .catch((err) => {
          expect(err).toBeTruthy();
          expect(err.status).toEqual(400);
        });
    });
  }); // bad DELETE no id
  describe('DELETE /api/v1/cat bad id', () => {
    test('should return status 404', () => {
      return superagent.del(`:${testPort}/api/v1/cat?id=4`)
        .then(() => {})
        .catch((err) => {
          expect(err).toBeTruthy();
          expect(err.status).toEqual(404);
        });
    });
  }); // bad DELETE no id
}); // closing BAD requests
