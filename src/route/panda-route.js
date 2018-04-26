'use strict';

const logger = require('../lib/logger');
const Panda = require('../model/panda');
const storage = require('../lib/storage');

module.exports = function routePanda(router) {
  router.post('/api/v1/panda', (req, res) => {
    logger.log(logger.INFO, 'ROUTE-PANDA: POST /api/v1/panda');

    try {
      const newPanda = new Panda(req.body.title, req.body.content);
      storage.create('Panda', newPanda)
        .then((panda) => {
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(panda));
          res.end();
          return undefined;
        });
    } catch (err) {
      logger.log(logger.ERROR, `ROUTE-PANDA: There was a bad request ${err}`);
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('Bad Request');
      res.end();
      return undefined;
    }
    return undefined;
  });

  router.get('/api/v1/panda', (req, res) => {
    if (!req.url.query.id) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('Your request requires an id');
      res.end();
      return undefined;
    }

    storage.fetchOne('Panda', req.url.query.id)
      .then((item) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(item));
        res.end();
        return undefined;
      })
      .catch((err) => {
        logger.log(logger.ERROR, err, JSON.stringify(err));
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Resource not found');
        res.end();
        return undefined;
      });
    return undefined;
  });
};
