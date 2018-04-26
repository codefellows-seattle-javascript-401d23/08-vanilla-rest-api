'use strict';

const logger = require('./logger');
const bodyParser = require('./body-parser');
const urlParser = require('./url-parser');
const resWrite = require('./res-writer');

const Router = module.exports = function router() {
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
  };
};

Router.prototype.get = function get(endpoint, callback) {
  this.routes.GET[endpoint] = callback;
};

Router.prototype.post = function post(endpoint, callback) {
  this.routes.POST[endpoint] = callback;
};

Router.prototype.put = function put(endpoint, callback) {
  this.routes.PUT[endpoint] = callback;
};

Router.prototype.delete = function del(endpoint, callback) {
  this.routes.DELETE[endpoint] = callback;
};

Router.prototype.route = function route() {
  return (req, res) => {
    // logger.log(logger.INFO, `req: ${JSON.stringify(req)}`);
    Promise.all([urlParser(req), bodyParser(req)])
      .then(() => {
        logger.log(logger.INFO, `testing if function ${this.routes[req.method]}`);
        if (typeof this.routes[req.method][req.url.pathname] === 'function') {
          this.routes[req.method][req.url.pathname](req, res);
          return;
        }
        resWrite(res, 404, 'text/plain', 'Route not found');
        // return undefined;
      })
      .catch((err) => {
        if (err instanceof SyntaxError) {
          resWrite(res, 404, 'text/plain', 'Route not found');
          return undefined;
        }
        logger.log(logger.ERROR, `ROUTER.ROUTE CATCH: ${JSON.stringify(err)}`);
        resWrite(res, 400, 'text/plain', 'Bad Request');
        return undefined;
      });
  };
};
