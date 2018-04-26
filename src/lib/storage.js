'use strict';

const logger = require('./logger');

const storage = module.exports = {};
const memory = {};

storage.create = function create(schema, item) {
  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('Schema is undefined'));
    if (!item) return reject(new Error('Item is undefined'));
    if (!memory[schema]) memory[schema] = {};
    memory[schema][item.id] = item;
    logger.log(logger.INFO, `STORAGE: Created new cat ${item}`);
    return resolve(item);
  });
};

storage.fetchOne = function fetchOne(schema, id) {
  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('Schema is undefined'));
    if (!id) return reject(new Error('Id is undefined'));
    if (!memory[schema]) return reject(new Error(`Schema ${schema} not found in memory`));
    const item = memory[schema][id];
    if (!item) return reject(new Error(`Item not found for id ${id}`));
    logger.log(logger.INFO, `STORAGE: Fetching cat ${item}`);
    return resolve(item);
  });
};

storage.fetchAll = function fetchAll(schema) {
  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('Schema is undefined'));
    if (!memory[schema]) return reject(new Error(`Schema ${schema} not found in memory`));
    const all = memory[schema];
    logger.log(logger.INFO, `STORAGE: Fetching all at ${schema}`);
    return resolve(all);
  });
};

storage.update = function update(schema, id, name, favoriteFood) {
  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('Schema is undefined'));
    if (!id) return reject(new Error('Id is undefined'));
    if (!memory[schema]) return reject(new Error(`Schema ${schema} not found in memory`));
    const item = memory[schema][id];
    if (!item) return reject(new Error(`Item not found for id ${id}`));
    item.id = id;
    item.name = name;
    item.favoriteFood = favoriteFood;
    logger.log(logger.INFO, `STORAGE: Updated at id ${id}: ${item}`);
    return resolve(item);
  });
};

storage.delete = function del(schema, id) {
  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('Schema is undefined'));
    if (!id) return reject(new Error('Id is undefined'));
    if (!memory[schema]) return reject(new Error(`Schema ${schema} not found in memory`));
    if (!memory[schema][id]) return reject(new Error(`Id ${id} not found in schema ${schema}`));
    const item = memory[schema][id];
    memory[schema][id] = null;
    logger.log(logger.INFO, `STORAGE: Removed item at id ${id}`);
    return resolve(item);
  });
};
