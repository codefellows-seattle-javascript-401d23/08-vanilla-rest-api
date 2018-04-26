'use strict';

const logger = require('./logger');

module.exports = function bodyParser(req) {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST' && req.method !== 'PUT') {
      return resolve(req);
    }

    let message = '';
    req.on('data', (data) => {
      logger.log(logger.INFO, `BODY PARSER: chunked request data: ${data.toString()}`);
      message += data.toString();
    });

    // listening for request to finished and then parse the JSON into a javascript object!
    req.on('end', () => {
      try {
        console.log(req); //before 
        req.body = JSON.parse(message);
        console.log(req); //after
        return resolve(req);
      } catch (err) {
        return reject(err);
      }
    });

    req.on('error', err => reject(err));
    logger.log(logger.ERROR, `BODY PARSER: Error occurred on parsing request body ${err}`);
    return undefined;
  });
  return undefined;
};

