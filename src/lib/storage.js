'use strict';

const logger = require('./logger');

const storage = module.exports = {};
const memory = {};

// memory = {
//   'Notes': { Motorcycle
//     '1234.567.89': {
//       'title': 'some title',
//       'content': 'some content',
//     }
//   }
// }

// schema is the type of resource, in this case note, and it will just be a 'string' 
// saying this is a note schema
// item is an actual object we'll pass in to post a newly created note
storage.create = function create(schema, item) {
  logger.log(logger.INFO, 'STORAGE: Created a new resource');
  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('Cannot create a new item, schema required'));
    if (!item) return reject(new Error('Cannot create a new item, item required'));

    if (!memory[schema]) memory[schema] = {};

    memory[schema][item.id] = item;
    return resolve(item);
  });
};

storage.fetchSingle = function fetchSingle(schema, id) {
  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('expected a schema name'));
    if (!id) return reject(new Error('expected an id'));
    if (!memory[schema]) return reject(new Error('schema was not found'));
    const item = memory[schema][id];
    if (!item) {
      return reject(new Error('item was not found'));
    } 
    return resolve(item);
    // return undefined;
  });
};

storage.fetchAll = function fetchAll(schema) {
  return new Promise((resolve, reject) => {
    if (!memory) return reject(new Error('expected memory object to contain data'));
    if (!memory[schema]) return reject(new Error('schema was not found'));
   
    const items = memory[schema];
    if (!items) {
      return reject(new Error('item was not found'));
    } 
    return resolve(items);
    // return undefined;
  });
};

storage.update = function update(schema, id) {

};

// delete functionality written here.
storage.removeById = function removeById(schema, id) {
  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('expected a schema name'));
    if (!id) return reject(new Error('expected an id'));
    if (!memory[schema]) return reject(new Error('schema was not found'));
    if (!memory[schema][id]) {
      return reject(new Error('item was not found'));
    } 
    delete memory[schema][id];
    return resolve(undefined);
    // return undefined;
  });
};
