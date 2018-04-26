'use strict';

const logger = require('./logger');

module.exports = function bodyParser(req) {// returns a PROMIS OBJECT
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST' && req.method !== 'PUT') {
      return resolve(req);
    }

    let message = '';// we will receive message in chunks so we concatenate here, original form is a buffer (ie hex)-- to string converts it to JSON
    req.on('data', (data) => {
      logger.log(logger.INFO, `BODY PARSER: chunked request data: ${data.toString()}`);
      message += data.toString();
    });

    req.on('end', () => { // when all data has been recieved, we are attaching an arbitrary property called body to it, then we will attach or message to this new body property-- now its a proper JSON so we can do JS to it, end is a meaning word to the listener here?
      try {
        console.log('BEFORE JSON PARSE', req.body);// is just a string at this point
        req.body = JSON.parse(message);// this is turning the string into a regulare JS obj
        logger.log(logger.INFO, `${req.body} AFTER JSON PARSE, body-parser req-bdoy try block`);
        return resolve(req);
      } catch (err) {
        logger.log(logger.INFO, `${req.body} body-parser req-bdoy error`);
        // this is checking for errors in what comes from urlParser
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
