'use strict';

const logger = require('../lib/logger');
const Zoo = require('../model/zoo');
const storage = require('../lib/storage');

module.exports = function routeZoo(router) {
  router.post('/api/v1/zoo', (req, res) => {
    logger.log(logger.INFO, 'ZOO-ROUTE: POST /api/v1/zoo');

    try {
      const newZoo = new Zoo(req.body.name, req.body.breed);
      storage.create('zoo', newZoo)
        .then((zoo) => {
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(zoo));
          res.end();
          return undefined;
        });
    } catch (err) {
      logger.log(logger.ERROR, `ZOO-ROUTE: There was a bad request ${err}`);
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('Bad request');
      res.end();
      return undefined;
    }
    return undefined;
  });

  router.get('/api/v1/zoo', (req, res) => {
    if (!req.url.query.id) {
      res.writeHead(400, { 'Content-Type': 'text/html' });
      res.write('Your request requires an id, bad request.');
      res.end();
      return undefined;
    }

    storage.fetchOne('zoo', req.url.query.id)
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
  
  router.get('/api/v1/zoo/all', (req, res) => {
    storage.fetchAll('zoo')
      .then((zoos) => {
        const zooArray = [];
        Object.keys(zoos).forEach(key => zooArray.push(zoos[key].id));
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(zooArray));
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
  }); // GET ALL

  router.deleteItem('/api/v1/zoo/remove', (req, res) => {
    if (!req.url.query.id) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.write('Your request requires an id');
      res.end();
      return undefined;
    }

    storage.remove('zoo', req.url.query.id)
      .then(() => {
        res.writeHead(204, { 'Content-Type': 'application/json' });
        res.write('Item successfully removed');
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
