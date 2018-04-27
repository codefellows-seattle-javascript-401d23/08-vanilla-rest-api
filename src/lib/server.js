'use strict';

const http = require('http');

// Router set up
const Router = require('./router');

const router = new Router();
require('../route/route-llama')(router);
// const logger = require('./logger');

// Application setup
// anonymous function is abstracted away???
const app = http.createServer(router.route());

// Server controls
const server = module.exports = {};
server.start = (port, callback) => app.listen(port, callback);
server.stop = callback => app.close(callback);
