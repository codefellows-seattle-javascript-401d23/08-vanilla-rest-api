'use strict';

const logger = require('../lib/logger');
const Motorcycle = require('../model/motorcycle');
const storage = require('../lib/storage');

module.exports = function routeMotorcycle(router) {
  router.post('/api/v1/motorcycle', (req, res) => {
    logger.log(logger.INFO, 'MOTORCYCLE-ROUTE: POST /api/v1/motorcycle');

    try {
      const newMotorcycle = new Motorcycle(req.body.title, req.body.content);
      storage.create('Motorcycle', newMotorcycle)
        .then((moto) => {
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(moto));
          res.end();
          return undefined;
        });
    } catch (err) {
      logger.log(logger.ERROR, `ROUTE-MOTORCYCLE: There was a bad request ${err}`);
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('Bad request');
      res.end();
      return undefined;
    }
    return undefined;
  });

  router.get('/api/v1/motorcycle', (req, res) => {
    if (!req.url.query.id) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('The request you have specified requires an ID');
      res.end();
      return undefined;
    }
    
    storage.fetchSingle('Motorcycle', req.url.query.id)
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
      });
    return undefined;
  });

  // Router object needs new route for fetching all items in storage array.
  router.get('/api/v1/motorcycle/all', (req, res) => {
    storage.fetchAll('Motorcycle')
    // item here needs to contain all of the things (array)
      .then((item) => {
        const itemArray = [];
        Object.keys(item).forEach(key => itemArray.push(item[key].id));
        res.writeHead(202, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(itemArray));
        res.end();
        return undefined;
      })
      .catch((err) => {
        logger.log(logger.ERROR, err, JSON.stringify(err));
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Resource not found');
        res.end();
      });
    return undefined;
  });

  // Route for removing particular id from the storage object
  router.remove('/api/v1/motorcycle/remove', (req, res) => {
    if (!req.url.query.id) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('The request you have specified requires an ID');
      res.end();
      return undefined;
    }
    
    storage.removeById('Motorcycle', req.url.query.id)
      .then(() => {
        res.writeHead(202, { 'Content-Type': 'application/json' });
        res.write('Selected item has been deleted');
        res.end();
        return undefined;
      })
      .catch((err) => {
        logger.log(logger.ERROR, err, JSON.stringify(err));
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Resource not found');
        res.end();
      });
    return undefined;
  });
};
