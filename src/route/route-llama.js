'use strict';

const logger = require('../lib/logger');
const Llama = require('../model/llama');
const storage = require('../lib/storage');

module.exports = function routeLlama(router) {
  router.post('/api/v1/llama', (req, res) => {
    logger.log(logger.INFO, 'ROUTE-LLAMA: POST /api/v1/llama');

    try {
      const newLlama = new Llama(req.body.title, req.body.content);
      storage.create('Llama', newLlama) // LLama is passed over from 'item' in storage.create
        .then((llama) => {
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(llama));
          res.end();
          return undefined;
        });
    } catch (err) {
      logger.log(logger.ERROR, `ROUTE-LLAMA: There was a bad request ${err}`);
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('Bad request');
      res.end();
      return undefined;
    }
    return undefined;
  });

  router.get('/api/v1/llama', (req, res) => {
    if (!req.url.query.id) {
      storage.fetchOne('Llama', req.url.query.id)
      .then((item) => {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('Your request requires an id');
      res.end();
      return undefined;
      })
      .catch((err) => {
        logger.log(logger.ERROR, err, JSON.stringify(err));
        res.writeHead(404,{ 'Content-Type': 'text/plain' });
        res.write('Resource not found');
        res.end();
        return undefined;
      });
    } else {
      storage.fetchOne('Llama', req.url.query.id)
        .then((item) => {
          // console.log(item, 'fetchOne');
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

  router.delete('/api/v1/llama', (req, res) => {
  storage.delete('Llama', req.url.query.id)
  .then(() => {
    res.writeHead(204, { 'Content-Type': 'text/plain' });
    res.write('Resource not found');
    res.end();
    return undefined;
  });
  return undefined;
  });
};

