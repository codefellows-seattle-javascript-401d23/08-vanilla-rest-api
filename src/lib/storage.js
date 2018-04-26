'use strict';

const logger = require('./logger');

const storage = module.exports = {};
const memory = {};

storage.create = function create(schema, item) {
  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('Cannot create a new item. Schema required.'));
    if (!item) return reject(new Error('Cannot create a new item. Item required.'));

    if (!memory[schema]) memory[schema] = {};
    memory[schema][item.id] = item;
    logger.log(logger.INFO, 'STORAGE: Created a new resource');
    return resolve(item);
  });
};

storage.fetchOne = function fetchOne(schema, id) {
  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('Expected schema name.'));
    if (!id) return reject(new Error('Expected ID.'));
    if (!memory[schema]) return reject(new Error('Schema not found.'));
    const item = memory[schema][id];

    if (!item) return reject(new Error('Item not found.'));
    return resolve(item);
  });
};

storage.fetchAll = function fetchAll() {

};

storage.update = function update() {

};

storage.delete = function del() {

};
