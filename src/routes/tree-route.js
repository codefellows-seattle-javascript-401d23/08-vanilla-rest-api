'use strict';

const logger = require('../lib/logger');
const Tree = require('../model/tree');// we are defining the variable for this module
const storage = require('../lib/storage');
//const router = require('../lib/router');

module.exports = function routeTree(router) { // exporting a function that takes in 'router'

  router.post('/api/v1/tree', (req, res) => {// an instance of our router it maps back to router.POST, everythign in our ty block here is equal to our try block here-- when we make our request--- it hits this-- which bounces to router which insaantiates this route and calls this try block??
    console.log('is this our router object?', router.routes);

    logger.log(logger.INFO, 'TREE-ROUTE: POST /api/v1/tree');
    try {
      const newTree = new Tree(req.body.title, req.body.content);// this defined in middleware-- url parser taking string info, sending to body parser and converting to JSON
      storage.create('Tree', newTree)
        .then((tree) => {
          // here treee is an item under the schema/category--> comes from 'storage' into here
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
    }// ifF
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
      }); // .catch here??
  });

  //   // storage.delete('Tree', req.url.query.id)
  //   //   .then((item) => {
  //   //     console.log('delete', item);
  //   //     res.writeHead(200, { 'Content-Type': 'application/json' });
  //   //     res.write(JSON.stringify(item));
  //   //     res.end();
  //   //     return undefined;
  //   //   })
  //   //   .catch((err) => {
  //   //     logger.log(logger.ERROR, err, JSON.stringify(err));
  //   //     res.writeHead(404, { 'Content-Type': 'text/plain' });
  //   //     res.write('Resource not found');
  //   //     res.end();
  //   //     return undefined;
  //   //   });
  //   // return undefined;
  // });
};
// module

