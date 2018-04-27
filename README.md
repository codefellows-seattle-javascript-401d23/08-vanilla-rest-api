# Documentation

This app creates new instances of cats in the api (`api/v1/cat`) which can be retrieved, updated, or deleted. It will also create local files for each individual cat object.

## Included Dependencies
- babel (babel-eslint 8.2.3, babel-preset-env 1.6.1, babel-register 6.26.0)
- AirBnb Style Guide (eslint 4.19.1, eslint-config-airbnb-base 12.1.0, eslint-plugin-import 2.11.0)
- jest (eslint-plugin-jest 21.15.1, jest 22.4.3)
- superagent (3.8.2)
- dotenv (5.0.1)
- uuid (3.2.1)
- winston (3.0.0-rc5)
- bluebird (3.5.1)
- fs (0.0.0-security)

## Classes
`class Router` : Instantiates a new Router with the property `routes` which in turn has properties for `GET`, `POST`, `PUT`, and `DELETE` routes. This class also has the following prototypes (first four prototypes have arity of 2)
  - `Router.prototype.get(route, callback)` : Creates a new `get` route property and assigns a function as its value.
  - `Router.prototype.post(route, callback)` : Creates a new `post` route property and assigns a function as its value.
  - `Router.prototype.put(route, callback)` : Creates a new `put` route property and assigns a function as its value.
  - `Router.prototype.delete(route, callback)` : Creates a new `delete` route property and assigns a function as its value.
  - `Router.prototype.route()` : Handles the `bodyParser` and `urlParser` promise resolutions and calls the function at the designated route.
    - Arity of 0
  
 `class Cat` : Instantiates a new Cat object with the properties `name` (created by user), `favoriteFood` (created by user), and `id` (generated from `uuid` node module).

## Cat Route Methods
`router.post(/api/v1/cat)` : An instance of a Router constructor prototype method. Creates a new Cat object using the request object passed in, calls the `storage.create` function, then writes the response headers.

`router.get(/api/v1/cat?id=<id>)` : An instance of a Router constructor prototype method. Calls the `storage.fetchOne` method at `<id>` and writes the response headers.

`router.get(/api/v1/cats)` : An instance of a Router constructor prototype method. Calls the `storage.fetchAll` method, returns an array of IDs of all existing Cat objects in the API, and writes the response headers.

`router.put(/api/v1/cat)` : An instance of a Router constructor prototype method. Calls the `storage.update` function and writes the response headers.

`router.delete(/api/v1/cat?id=<id>)` : An instance of a Router constructor prototype method. Calls and `storage.delete` function and and writes the response headers.

## Server Methods
`server.start(port, callback)` : This will call the app.listen() function at the designated port and return a callback.
- Arity of 2

`server.stop(callback)` : This will call the app.close() function and return a callback.
- Arity of 1

## Parsing Methods
`bodyParser`: Takes in the request object and, if the request method is not POST or PUT, uses the `body-parser` node module to parse out the body and returns the `JSON.parse`-d message that was retrieved from the API.
- Arity of 1 <br/>

`urlParser`: Takes in the request object and uses the `querystring` node module to parse out the query string into all defined properties and set them to their corresponding key-value pairs.
- Arity of 1

### Storage Methods
These method all return Promises.

`storage.create(schema, item)`: Takes in the schema (ex. 'Cat') and will create a new json file in the database with the filename of the id generated from the instantiation of the Cat class.
- Arity of 2

`storage.fetchOne(schema, id)`: Takes in the schema (ex. 'Cat') and the id and returns the Cat at that id from the database. Will check that schema and id exist.
- Arity of 2

`storage.fetchAll(schema)`: Takes in the schema (ex. 'Cat') and returns the entire schema object retrieved from the database. Will check that the schema exists.
- Arity of 1

`storage.update(schema, id, name, favoriteFood)`: Takes in the schema (ex. 'Cat'), id, name, and favoriteFood, updates the object at that id in the API, and returns it. Will check that schema and id exist.
- Arity of 4

`storage.delete(schema, id)`: Takes in the schema (ex. 'Cat') and the id and deletes the cat at that id from the API. Returns an empty object.
- Arity of 2

### ResWrite Method

This is a custom helper function that will handle writing response headers.

`resWrite(res, statusCode, contentType, body)`

This function accomplishes the equivalent of:

`res.writeHead(<statusCode>, { 'Content-Type' : '<contentType>' });`

`res.write(body);`

`res.end();`
- Arity of 4
