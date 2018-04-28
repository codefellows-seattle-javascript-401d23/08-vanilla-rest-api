Lab 08: Vanilla REST API
======

**Author:** Jennifer Piper

This is a very simple REST API, to store and retrieve info about birds. While the server is running, it will store name, type, and info for each item. There is no persistent storage.

## Getting Started
In a node.js environment, from the root of this repo, enter these commands to start the server on port 3000:
* npm i
* npm start

## API Endpoints

* To create a new bird resource:
 ```
 http POST :3000/api/v1/bird name=birdname type=birdtype info='extra info about this bird'
 ```
 This will return a JSON object including a newly-generated id which can be used to retrieve that resource.
 
* To retrieve a list of all stored birds:
```
http GET :3000/api/v1/allbirds
```

 * To retrieve an array of all stored resource ids: 
 ```
 http GET :3000/api/v1/bird/ids
 ```
 
* To retrieve a resource by id, for example if id is '1234-5678':
```
http GET :3000/api/v1/bird?id=1234-5678
```
* To delete a resource by id, for example if id is '1234-5678':
```
http DELETE :3000/api/v1/bird?id=1234-5678
```
This will return with status code 204 and no message, as specified in the lab instructions. 
