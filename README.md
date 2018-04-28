Lab 08: Vanilla REST API
======

## This is a very simple REST API, to store and retrieve info about birds. While the server is running, it will store name, type, and info for each item. There is no persistent storage.

## Getting Started
In a node.js environment, from the root of this repo, enter these commands to start the server on port 3000:
* npm i
* npm start

## API Endpoints

* To create a new bird resource:
 http POST :3000/api/v1/bird name=birdname type=birdtype info='extra info about this bird'
 This will return a JSON object including a newly-generated id which can be used to retrieve that resource.
 
 * To retrieve an array of all stored resource ids: 
 http GET :3000/api/v1/bird/ids
 
* To retrieve a resource by id, for example if id is '1234-5678'
http GET :3000/api/v1/bird?id=1234-5678

* To retrieve a list of all stored birds:
http GET :3000/api/v1/allbirds

## Server Endpoints

* `DELETE` request
 * pass `?id=<uuid>` in the query string to **DELETE** a specific resource
 * this should return a 204 status code with no content in the body

## Tests
* write a test to ensure that your api returns a status code of 404 for routes that have not been registered
* write tests to ensure the `/api/simple-resource-name` endpoint responds as described for each condition below:
 * `GET`: test 404, it should respond with 'not found' for valid requests made with an id that was not found
 * `GET`: test 400, it should respond with 'bad request' if no id was provided in the request
 * `GET`: test 200, it should contain a response body for a request made with a valid id
 * `POST`: test 400, it should respond with 'bad request' if no request body was provided or the body was invalid
 * `POST`: test 200, it should respond with the body content for a post request with a valid body

