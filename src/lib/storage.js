'use strict';

const logger = require('./logger');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), { suffix: 'Prom' });

const storage = module.exports = {};

storage.create = function create(schema, item) {
  if (!schema) return Promise.reject(new Error('Schema is undefined'));
  if (!item) return Promise.reject(new Error('Item is undefined'));
  const jsonItem = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${item.id}.json`, jsonItem)
    .then(() => {
      logger.log(logger.INFO, `STORAGE: Created new cat ${item}`);
      return Promise.resolve(item);
    })
    .catch(err => Promise.reject(err));
};

storage.fetchOne = function fetchOne(schema, id) {
  if (!schema) return Promise.reject(new Error('Schema is undefined'));
  if (!id) return Promise.reject(new Error('Id is undefined'));
  return fs.readFileProm(`${__dirname}/../data/${schema}/${id}.json`)
    .then((data) => {
      try {
        return Promise.resolve(JSON.parse(data.toString()));
      } catch (err) {
        return Promise.reject(err);
      }
    })
    .catch(err => logger.log(logger.ERROR, err));
};

storage.fetchAll = function fetchAll(schema) {
  if (!schema) return Promise.reject(new Error('Schema is undefined'));
  return fs.readdirProm(`${__dirname}/../data/${schema}`)
    .then((files) => {
      return Promise.resolve(files);
    })
    .catch(err => logger.log(logger.ERROR, err));
};

storage.update = function update(schema, id, name, favoriteFood) {
  if (!schema) return Promise.reject(new Error('Schema is undefined'));
  if (!id) return Promise.reject(new Error('Id is undefined'));
  const item = { id, name, favoriteFood };
  const jsonItem = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${id}.json`, jsonItem)
    .then(() => {
      logger.log(logger.INFO, `STORAGE: Updated at id ${id}`);
      return Promise.resolve(item);
    })
    .catch(err => Promise.reject(err));
};

storage.delete = function del(schema, id) {
  if (!schema) return Promise.reject(new Error('Schema is undefined'));
  if (!id) return Promise.reject(new Error('Id is undefined'));
  const object = { content: '' };
  return fs.unlinkProm(`${__dirname}/../data/${schema}/${id}.json`)
    .then(() => {
      logger.log(logger.INFO, `STORAGE: Removed item at id ${id}`);
      return Promise.resolve(object);
    })
    .catch(err => logger.log(logger.ERROR, err));
};
