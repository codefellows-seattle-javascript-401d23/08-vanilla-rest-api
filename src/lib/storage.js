'use strict';

const logger = require('./logger');
const storage = module.exports = {};
const memory = {};

// memory = {
//   'Trees': {
//     '1234.567.89': {
//       'title': 'some title',
//       'content': 'some content',
//     }
//   }
// }

// schema is the type of resource, in this case tree, and it will just be a 'string' saying this is a tree schema
// item is an actual object we'll pass in to post a newly created tree

storage.create = function create(schema, item) {
  logger.log(logger.INFO, 'STORAGE: Created a new resource');
  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('cannot create item, schema no exist!'));
    if (!item) return reject(new Error('cannot create a new item, no item'));

    if (!memory[schema]) memory[schema] = {};
    memory[schema][item.id] = item;
    return resolve(item);
  });
};

storage.fetchOne = function fetchOne(schema, id) {
  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('expected schema name'));
    if (!id) return reject(new Error('expected id'));
    if (!memory[schema]) return reject(new Error('schema not found'));
    const item = memory[schema][id];
    if (!item) {
      return reject(new Error('item not found'));
    } 
    return resolve(item);
    // return undefined;
  });
};

storage.fetchAll = function fetchAll() {
  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('expected schema name'));
    if (!id) return reject(new Error('expected id'));
    if (!memory[schema]) return reject(new Error('schema not found'));
    const item = memory[schema][id];
    if (!item) {
      return reject(new Error('item not found'));
    } 
    const allTrees = [];
    allTrees.push(resolve);
    console.log(allTrees);
    return Promise.all(allTrees);
  });
  
  
};

storage.update = function update(schema, id) {
  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('expected schema name'));
    if (!id) return reject(new Error('expected id'));
    if (!memory[schema]) return reject(new Error('schema not found'));
    const item = memory[schema][id];
    if (!item) {
      return reject(new Error('item not found'));
    } 
    return resolve(item);
    // return undefined;
  });

};

storage.delete = function del() {

}; 
