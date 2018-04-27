'use strict';

const uuid = require('uuid');
const logger = require('../lib/logger');

module.exports = class {
  constructor(title, content) {
    if (!title || !content) throw new Error('POST request requires a Title and Content');
    this.title = title;
    this.content = content;
    this.id = uuid();
    logger.log(logger.INFO, `MOTORCYCLE: Created a new motorcycle: ${JSON.stringify(this)}`);
  }
};
