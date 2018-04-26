'use strict';

const logger = require('./logger');

module.exports = function bodyParser(req) {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST' && req.method !== 'PUT') {
      return resolve(req);
    }

    let message = '';// we will receive message in chunks so we concatenate here
    req.on('data', (data) => {
      logger.log(logger.INFO, `BODY PARSER: chunked request data: ${data.toString()}`);
      message += data.toString();
    });

    req.on('end', () => {
      try {
        req.body = JSON.parse(message);// what are we doing here???
        logger.log(logger.INFO, `${JSON.stringify(req.body)} body-parser req-bdoy try block`);
        return resolve(req);
      } catch (err) {
        logger.log(logger.INFO, `${req.body} body-parser req-bdoy error`);
        return reject(err);
      }
    });

    req.on('error', (err) => {
      logger.log(logger.ERROR, `BODY PARSER: Error occured on parsing request body ${err}`);
      return reject(err);
    });
    return undefined;
  });
};
