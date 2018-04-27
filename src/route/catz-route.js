'use strict';
const logger = require('../lib/logger');
const Catz = require('../model/catz');
const storage = require('../lib/storage');
module.exports = function routeCatz(router) {
  router.post('/api/v1/catz', (req, res) => {
    logger.log(logger.INFO, 'ROUTE-CATZ: POST /api/v1/catz');
    try {
      const newCatz = new Catz(req.body.title, req.body.content);
      storage.create('Catz', newCatz)
        .then((catz) => {
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(catz));
          res.end();
          return undefined;
        });
    } catch (err) {
      logger.log(logger.ERROR, `ROUTE-CATZ: There was a bad request ${err}`);
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('Bad request');
      res.end();
      return undefined;
    }
    return undefined;
  });
  router.get('/api/v1/catz', (req, res) => {
    if (req.url.query.id) {
      storage.fetchOne('Catz', req.url.query.id)
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
    } else {
      storage.fetchAll('Catz')
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
    }
  });
  router.delete('/api/v1/catz', (req, res) => {
    storage.delete('Catz', req.url.query.id)
      .then(() => {
        res.writeHead(204, { 'Content-Type': 'text/plain' });
        res.write('No content in the body');
        res.end();
        return undefined;
      })
      .catch((err) => {
        logger.log(logger.ERROR, err, JSON.stringify(err));
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Resource not found');
        res.end();
        return undefined;
      }); return undefined;
  });
};
