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
  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('Cannot create a new item, schema required'));
    if (!item) return reject(new Error('Cannot create a new item, item required'));

    if (!memory[schema]) memory[schema] = {};

    memory[schema][item.id] = item;
    logger.log(logger.INFO, 'STORAGE: Created a new resource');
    console.log(`STORAGE.CREATE above return, schema is: ${schema} and item is: `, item );
    return resolve(item);
  });
};

storage.fetchOne = function fetchOne(schema, id) {
  // takes in a schema(so what directory) and id(what item specifically)
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

storage.fetchAll = function fetchAll(schema) {
  // first need to know how many items in storage then call for each item?
  // so for each item in memory
  // gather all promises in array, resolve then return
  //can this return an array of promises?
// so: return resolve(array);
  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('expected schema name'));
    if (!memory[schema]) return reject(new Error('schema not found'));
    const idArray = Object.keys(memory[schema]);
    console.log(idArray);
    // const all = memory[schema];
    return resolve(idArray);
  // return undefined;
  });

};

storage.update = function update() {

};

storage.delete = function del(schema, id) {
  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('expected schema name'));
    if (!id) return reject(new Error('expected id'));
    if (!memory[schema]) return reject(new Error('schema not found'));
    const item = memory[schema][id];
    if (!item) {
      return reject(new Error('item not found'));
    } 
    delete memory[schema][id];
    return resolve('deleted');
    // return undefined;
  });
  

};