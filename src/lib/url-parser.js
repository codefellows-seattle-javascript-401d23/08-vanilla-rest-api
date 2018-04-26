'use strict';

const url = require('url');
const querystring = require('querystring');
const logger = require('./logger');

module.exports = function urlParser(req) {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);
  logger.log(logger.INFO, `req.url: ${req.url}`);
  return Promise.resolve(req);
};
