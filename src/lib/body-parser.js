'use strict';

const url = require('url');
const queryString = require('querystring');

module.exports = function bodyParser(req) {
  return new Promise((resolve, reject) => {
    req.url = url.parse(req.url);
    req.url.query = queryString.parse(req.url.query);

    // if it's a GET request (or DELETE, but we're not going to use DELETE for this lab.)
    if (req.method !== 'POST' && req.method !== 'PUT') {
      return resolve(req);
    }

    let message = '';
    // add chunks of data to 'message' as they arrive.
    req.on('data', (data) => {
      message += data.toString();
    });

    req.on('end', () => {
      try {
        req.body = JSON.parse(message);
        return resolve(req);
      } catch (err) {
        return reject(err);
      }
    });
    req.on('error', err => reject(err));
    return undefined;
  });
};
