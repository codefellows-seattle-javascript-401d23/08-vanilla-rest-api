'use strict';

const logger = require('./logger');
const storage = module.exports = {};
const memory = {};

// memory = {
//  'Llamas': {
//    '1234.567.89': {
//      'title': 'some llama title',
//        'content': 'some llama content'  
//    }
//  }
//}

// schema is the type of resource, in this case llama, and it will just be a 'string' saying this is a llama schema
// item is an actual object that we pass in to post a newly created llama 
storage.create = function create(schema, item) {
  logger.log(logger.INFO, 'STORAGE: Created a new resource');
  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('Cannot create a new item, schema required!'));
    if (!item) return reject(new Error('Cannot creat a new item, item, required please!'));

    if (!memory[schema]) memory[schema] = {};

    memory[schema][item.id] = item;
    return resolve(item);
  });
};

storage.fetchOne = function fetchOne(schema, id) {
  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('expected id'));
    if (!id) return reject(new Error('expected id'));
    if (!memory[schema]) return(new Error('schema not found'));
    const item = memory[schema][id];
    if (!item) {
      return reject(new error('item not found'));
    }
    return resolved(item);
    // return undefined;
  });
};

// storage.fetchAll = function fetchAll() {
//   //  codez here
// };

// storage.update = function update() {
//   // codez here
// };

// storage.delete = function remove() {
//   //  codez here
// };