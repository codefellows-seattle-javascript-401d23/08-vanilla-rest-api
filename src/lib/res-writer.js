'use strict';

module.exports = function resWrite(res, statusCode, contentType, body) {
  res.writeHead(statusCode, { 'Content-Type': contentType });
  res.write(body);
  res.end();
  return undefined;
};
