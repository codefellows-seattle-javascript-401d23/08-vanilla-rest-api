'use strict';

const http = require('http');

const Router = require('./router');

const router = new Router();
require('../route/bird-route')(router);

// const app = http.createServer(router.route());
const bodyParser = require('./body-parser');

const app = http.createServer((req, res) => {
  bodyParser(req)
    .then((parsedRequest) => {
      if (parsedRequest.method === 'GET' && parsedRequest.url.pathname === '/time') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({
          date: new Date(),
        }));
        res.end();
        return undefined;
      }
      return undefined;
    });
});

const server = module.exports = {};
server.start = (port, callback) => app.listen(port, callback);
server.stop = callback => app.close(callback);
