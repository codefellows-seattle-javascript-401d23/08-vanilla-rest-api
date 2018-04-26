'use strict';

const logger = require('../lib/logger');
const Tree = require('../model/tree');// we are defining the variable for this module
const storage = require('../lib/storage');

module.exports = function routeTree(router) {

  router.post('/api/v1/tree', (req, res) => {
    logger.log(logger.INFO, 'TREE-ROUTE: POST /api/v1/tree');
    try {
      const newTree = new Tree(req.body.title, req.body.content);
      storage.create('Tree', newTree)
        .then((tree) => {
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(tree));
          res.end();
          return undefined;
        });
    } catch (err) {
      logger.log(logger.ERROR, `ROUTE-TREE: There was a bad request ${err}`);
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('Bad request THIS OTHER ONE');
      res.end();
      return undefined;
    }
  });// POST
  router.get('api/v1/tree', (req, res) => {
    if (!req.url.query.id) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('Your request requires an id');
      res.end();
      return undefined;
    }// if
    storage.fetchOne('Tree', req.url.query.id)
      .then((item) => {
        console.log('fetchOne item', item);
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

};// module

