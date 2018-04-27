# Lab 08 - Vanilla REST API
**Author**: Carl Olson
**Version**: 1.0.0 

## Overview
This lab focused on using promises to handle asynchronous functionality, while creating a vanilla restful api with in-memory persistence.

The class Restaurant is a constructor for objects representing restaurants with properties of name, cuisine and location. Each instance is also given an id via uuid. The Router constructor has a property of routes (which in turn has properties of GET, POST, PUT, DELETE), as well as methods on the prototype for get, post, put and delete. An instance of the Router is created on starting the server and then listening for an http request. A received request is then passed through the urlParser and bodyParser modules before calling the corresponding get/post/put/delete method. Promises are used to store the request data in a memory object before resolving with data that is used for the response or rejecting with an error.

## Getting Started
Install Dependencies, used nodemon to start the server. 

## Architecture
JavaScript, Node, Babel, ESLint, Jest, winston, dotenv, superagent, logger, nodemon, uuid.
