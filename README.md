# Lab 08 Vanilla Rest API
**Author**: Lacy Hogan
**Version**: 1.0.0

## Overview
This application stores information about pandas. It takes in a title and a content, and assigns it an ID using Node.js UUID. A user can create a new penguin, retrieve an existing one, retrieve all stored ones, and delete an existing one.

## Getting Started
As a user, you will need to have Nodemon installed on your computer in order to start the server.

You will need to include the following scripts in your package.json in order to run the tests and nodemon:

 "scripts": {
    "test": "jest --coverage",
    "start": "nodemon main.js",
    "eslint": "eslint ."

You will need to init the following dependencies and devDependencies before utilizing this application:

  "devDependencies": {
    "babel-eslint": "^8.2.3",
    "babel-preset-env": "^1.6.1",
    "babel-register": "^6.26.0",
    "eslint": "^4.19.1",
    "eslint-config-airbnb-base": "^12.1.0",
    "eslint-plugin-import": "^2.11.0",
    "eslint-plugin-jest": "^21.15.1",
    "jest": "^22.4.3",
    "nodemon": "^1.17.3",
    "superagent": "^3.8.2"
  },
  "dependencies": {
    "dotenv": "^5.0.1",
    "uuid": "^3.2.1",
    "winston": "^3.0.0-rc5"
  }

Create a .env file and include the following:
NODE_ENV=development
PORT=3000

## Architecture
This application is written in JavaScript and uses Node.js. You will need nodemon installed. No external middleware was utilized, they were written internally to this application: body-parser, router, and url-parser. A storage file has been written to temporarily store data. It resets after ever test.  

The test will be run using CLI. You will need to ensure that you have httpie installed on your computer. Then, in one terminal, run the command: nodemon index.js. Then, in a separate terminal, run the commands:

To POST/CREATE - http POST :3000/api/pandas title=[name of species] content=[name] 

- If successful, will respond with a 200 status. If an invalid post is made, will respond with a 400 status

To GET/READ - http :3000/api/penguins id==[insert existing id]

- If successful, will respond with a 200 status. If an invalid get is made, will respond with a 404 status

To GET ALL/READ ALL - http :3000/api/penguins

- If successful, will respond with a 200 status. If an invalid get is made, will respond with a 404 status

to DELETE - http DELETE :3000/api/penguins id==[insert existing id]

- If successful, will respond with a 204 status. If an invalid post is made, will respond with a 404 status

## Change Log
04-26-2018 11:39pm - Application functions created and passing all tests

## Credits and Collaborations
