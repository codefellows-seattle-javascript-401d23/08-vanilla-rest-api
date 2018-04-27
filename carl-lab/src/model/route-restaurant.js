'use strict';

const logger = require('../lib/logger');
const Restaurant = require('../model/restaurant');
const storage = require('../lib/storage');

module.exports = function routeRestaurant(router) {
  // POST a restaurant
  router.post('/api/v1/restaurant', (req, res) => {
    try {
      const newRestaurant = new Restaurant(req.body.name, req.body.cuisine, req.body.location);
      // Promise initiated here with storage.create
      storage.create('Restaurant', newRestaurant)
        .then((restaurant) => {
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(restaurant));
          res.end();
          return undefined;
        });
    } catch (err) {
      logger.log(logger.ERROR, `ROUTE-RESTAURANT: There was a bad request ${err}`);
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('Bad request - 1 - route-restaurant POST');
      res.end();
      return undefined;
    }
    return undefined;
  });

  // GET one restaurant
  router.get('/api/v1/restaurant', (req, res) => {
    logger.log(logger.INFO, `RESTAURANT ROUTE: GET /api/v1/restaurant - ${JSON.stringify(res.body)}`);

    if (!req.url.query.id) { // response.sentText
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('Your request requires an id');
      res.end();
      return undefined;
    }

    storage.fetchOne('Restaurant', req.url.query.id)
      .then((item) => { // response.sendJSON
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

  // GET all restaurants
  router.get('/api/v1/restaurants', (req, res) => {
    logger.log(logger.INFO, 'RESTAURANT ROUTE: GET all /api/v1/restaurants');

    storage.fetchAll('Restaurant', req.body)
      .then((items) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(items));
        res.end();
        return undefined;
      })
      .catch((err) => {
        logger.log(logger.ERROR, err, JSON.stringify(err));
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Resources not found - Request for all restaurants');
        res.end();
        return undefined;
      });
    return undefined;  
  });

  // // PUT - update restaurant
  router.put('/api/v1/restaurant', (req, res) => {
    logger.log(logger.INFO, 'RESTAURANT ROUTE: Update /api/v1/restaurant');

    try {
      const newRestaurant = new Restaurant(
        req.body.name, 
        req.body.cuisine, 
        req.body.location, 
        req.body.id,
      );
      storage.update('Restaurant', newRestaurant)
        .then((restaurant) => {
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(restaurant));
          res.end();
          return undefined;
        });
    } catch (err) {
      logger.log(logger.ERROR, `ROUTE-RESTAURANT: There was a bad request ${err}`);
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('Bad request - 1 - route-restaurant POST');
      res.end();
      return undefined;
    }
    return undefined;
  });

  // DELETE restaurant
  router.delete('/api/v1/restaurant', (req, res) => {
    logger.log(logger.INFO, 'RESTAURANT ROUTE: DELETE /api/v1/restaurant');

    if (!req.url.query.id) { // response.sentText
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('Your DELETE request requires an id');
      res.end();
      return undefined;
    }

    storage.delete('Restaurant', req.url.query.id)
      .then(() => {
        res.writeHead(204, { 'Content-Type': 'application/json' });
        res.write('The restaurant has been deleted');
        res.end();
        return undefined;
      })
      .catch((err) => {
        logger.log(logger.ERROR, `DELETE catch: There was a bad request ${err}`);
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.write('Bad request - route-restaurant DELETE');
        res.end();
        return undefined;
      });
    return undefined;
  });
};
