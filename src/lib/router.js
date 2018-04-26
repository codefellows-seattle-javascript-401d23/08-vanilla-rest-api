'use strict';

const logger = require('./logger');
const bodyParser = require('./body-parser');
const urlParser = require('./url-parser');

const Router = module.exports = function router() {
  this.routes = {
    GET: {
    //   // Just a hard-coded example
    //   '/api/v1/tree': (req, res) => {},
    //   '/api/v1/tree/:id': (req, res) => {},
    // these will be dynamically generated

    },
    POST: {
    //   '/api/v1/tree': (req, res) => {},
    },
    PUT: {},
    DELETE: {},
  };
};

Router.prototype.get = function get(endpoint, callback) {
  console.log(`Router: GET ${endpoint} mounted`);
  this.routes.GET[endpoint] = callback;
};

Router.prototype.post = function post(endpoint, callback) {
  Router.prototype.get = function get(endpoint, callback) {
    console.log(`Router: POST ${endpoint} mounted`);
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
      Promise.all([
        urlParser(req),
        bodyParser(req),
      ])
        .then(() => {
          logger.log(logger.INFO, `${JSON.stringify.req.body} req.body in ROUTER`);
          if (typeof this.routes[req.method][req.url.pathname] === 'function') {
            this.routes[req.method][req.url.pathname](req, res);
            return;
          } 
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.write('Route Not Found FROM HERE');
          res.end();
        })
        .catch((err) => {
          if (err instanceof SyntaxError) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('Route Not Found');
            res.end();
            return undefined;
          }
        
          console.log(req.body, 'router final error block');
          if (req.body) {
            return req;
          }
          logger.log(logger.ERROR, JSON.stringify(err));
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.write('Bad Request THIS ONE HERE');
          res.end();
          return undefined;
        });
        .then((otherReq) => {
        // this is to accodmodate weird error where body was passed into error block T_T whyyyyy
        // console.log(otherReq, 'in this other THEN block??');
          if (typeof this.routes[otherReq.method][otherReq.url.pathname] === 'function') {
            this.routes[otherReq.method][otherReq.url.pathname](otherReq, res);
          } 
        });//final .then 
    };
  }; 
};