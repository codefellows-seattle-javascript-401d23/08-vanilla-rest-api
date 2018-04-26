'use strict';

const http = require('http');
const Router = require('./router');
const router = new Router();
require('../route/route-note')(router);
// Josh - Judy had notes in her code

const app = http.createServer(router.route());

const server = module.expoerts = {};
server.start = (port, callback) => app.listen(port, callback);
server.stop = callback => app.close(callback);
