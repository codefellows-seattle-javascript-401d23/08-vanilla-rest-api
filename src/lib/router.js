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
    // these will be dynamically generated-- and only exist while server is running and after each route is called
    },
    POST: {
    //   '/api/v1/tree': (req, res) => {},
    },
    PUT: {},
    DELETE: {},
  };
};

Router.prototype.get = function get(endpoint, callback) {// taking in a path as arg and a function, is this being passed into our tree-routes module???? then sending them to our routs?
  console.log(`Router: GET ${endpoint} mounted`);
  this.routes.GET[endpoint] = callback;// when we run this function on a ____ it insantiates this object
};

Router.prototype.post = function post(endpoint, callback) {
  console.log(`Router: POST ${endpoint} mounted`);
  this.routes.POST[endpoint] = callback;// these are sending the path to our objct keys
};

Router.prototype.put = function put(endpoint, callback) {
  console.log(`Router: PUT ${endpoint} mounted`);
  this.routes.PUT[endpoint] = callback;
};

Router.prototype.delete = function del(endpoint, callback) {
  console.log(`Router: DELETE ${endpoint} mounted`);
  this.routes.DELETE[endpoint] = callback;
};

Router.prototype.route = function route() {
  return (req, res) => {
    // body parser is being called here and the request is being passed to it after having been parsed by the URL parser
    Promise.all([
      urlParser(req),
      bodyParser(req),
    ])
      .then(() => {// AFTER we make our request -- > type command POST--> req goes to middleware (body Parser)---> then comes here
        logger.log(logger.INFO, `${JSON.stringify.req.body} req.body in ROUTER`);
        if (typeof this.routes[req.method][req.url.pathname] === 'function') {// if our request that we get from body parser has a word that matches the function names above ie 'delete' 'post', and here we are checking that that variable has a type of function req.method<-- method exists already only thing we make is the pathnames
          this.routes[req.method][req.url.pathname](req, res);// then send to our router where the path is reassigned as a function that calls (itself?) and takes in arguments (req, res).... so in router obj, GET: {api/vi/pthname(req, res);---> now if route is 'called'/accessed, the functionality in tree-route for that property (get, post etc) is called}
          console.log('router', Router);
          return;
        } 
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Route Not Found FROM HERE');
        res.end();
      })
      .catch((err) => {
  
        if (res.method === 'POST' && !res.body.title) {
          // looks like body parser error is getting routed here-- yes, syntax error is built in object-- basically if invalid path this is the error the body parser throws-- so an error in the 
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.write('Route not found--title input required');
          res.end();
          return undefined;
        }
        if (err instanceof SyntaxError) {
          // looks like body parser error is getting routed here-- yes, syntax error is built in object-- basically if invalid path this is the error the body parser throws-- so an error in the 
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.write('Route Not Found / BAD REQUEST in Body Parser');
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
      })
      .then((otherReq) => {
        // this is to accodmodate weird error where body was passed into error block T_T whyyyyy
        // console.log(otherReq, 'in this other THEN block??');
        if (typeof this.routes[otherReq.method][otherReq.url.pathname] === 'function') {
          this.routes[otherReq.method][otherReq.url.pathname](otherReq, res);
        } 
     
      })
      .catch((err) => {
        logger.log(logger.ERROR, JSON.stringify(err));
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.write('Bad Request THE ONE AFTER THE WEIRD FIX');
        res.end();
        return undefined;
      });//final .then 
  };
}; 
