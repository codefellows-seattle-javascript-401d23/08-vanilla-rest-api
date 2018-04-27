'use strict';

const logger = require('../lib/logger');
const Cat = require('../model/cat');
const storage = require('../lib/storage');
const resWrite = require('../lib/res-writer');

// router.[WHATEVER] takes in 'endpoint', function

module.exports = function routeCat(router) {
  router.post('/api/v1/cat', (req, res) => {
    logger.log(logger.INFO, 'CAT-ROUTE: POST /api/v1/cat');
    try {
      const newCat = new Cat(req.body.name, req.body.favoriteFood);
      storage.create('Cat', newCat)
        .then((cat) => {
          resWrite(res, 201, 'application/json', JSON.stringify(cat));
          return undefined;
        });
    } catch (err) {
      logger.log(logger.ERROR, `CAT-ROUTE: Bad Request ${err}`);
      resWrite(res, 400, 'text/plain', 'Bad request');
      return undefined;
    }
    return undefined;
  }); // closing POST

  router.get('/api/v1/cat', (req, res) => {
    logger.log(logger.INFO, 'CAT-ROUTE: GET /api/v1/cat');
    if (!req.url.query.id) {
      resWrite(res, 400, 'text/plain', 'Request requires an ID');
      return undefined;
    }
    storage.fetchOne('Cat', req.url.query.id)
      .then((cat) => {
        resWrite(res, 200, 'application/json', JSON.stringify(cat));
        return undefined;
      })
      .catch((err) => {
        logger.log(logger.ERROR, JSON.stringify(err));
        resWrite(res, 404, 'text/plain', 'Resource not found');
        return undefined;
      });
    return undefined;
  }); // closing GET one

  router.get('/api/v1/cats', (req, res) => {
    logger.log(logger.INFO, 'CAT-ROUTE: GET ALL /api/v1/cats');
    storage.fetchAll('Cat')
      .then((cats) => {
        for (let i = 0; i < cats.length; i++) {
          cats[i] = cats[i].replace(/\.\w{4}$/g, '');
        }
        resWrite(res, 200, 'application/json', JSON.stringify(cats));
        return undefined;
      })
      .catch((err) => {
        logger.log(logger.ERROR, JSON.stringify(err));
        resWrite(res, 404, 'text/plain', 'Resource not found');
        return undefined;
      });
    return undefined;
  }); // closing GET all

  router.put('/api/v1/cat', (req, res) => {
    logger.log(logger.INFO, 'CAT-ROUTE: UPDATE /api/v1/cat');
    if (!req.body.id) {
      resWrite(res, 400, 'text/plain', 'Request requires an ID');
      return undefined;
    }
    try {
      storage.update('Cat', req.body.id, req.body.name, req.body.favoriteFood)
        .then((cat) => {
          resWrite(res, 200, 'application/json', JSON.stringify(cat));
          return undefined;
        });
    } catch (err) {
      logger.log(logger.ERROR, `CAT-ROUTE: Bad Request ${err}`);
      resWrite(res, 404, 'text/plain', 'Resource not found');
      return undefined;
    }
    return undefined;
  }); // closing PUT

  router.delete('/api/v1/cat', (req, res) => {
    logger.log(logger.INFO, 'CAT-ROUTE: DELETE /api/v1/cat');
    if (!req.url.query.id) {
      resWrite(res, 400, 'text/plain', 'Request requires an ID');
      return undefined;
    }
    storage.delete('Cat', req.url.query.id)
      .then(() => {
        logger.log(logger.INFO, `DELETE: File at ${req.url.query.id}`);
        resWrite(res, 204, 'text/plain', '');
        return undefined;
      })
      .catch((err) => {
        logger.log(logger.ERROR, `CAT-ROUTE: Bad request ${err}`);
        resWrite(res, 404, 'text/plain', 'Bad request');
      });
    return undefined;
  }); // closing DESTROY
};
