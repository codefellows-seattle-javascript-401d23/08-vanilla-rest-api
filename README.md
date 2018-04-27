Lab 08: Vanilla Rest API
Author: Dawn Version: 1.0.0

Overview
create an HTTP server using the native NodeJS http module
create an object constructor that creates a simple resource with at least 3 properties
include an id property that is set to a unique id (hint: you'll need to use node-uuid)
include two additional properties of your choice (ex: name, content, etc.)
create a custom body parser module that uses promises to parse the JSON body of POST and PUT requests
create a custom url parser module that returns a promise and uses the NodeJS url and querystring modules to parse the request url
create a router constructor that handles requests to GET, POST, PUT, and DELETE requests
create a storage module that will store resources by their schema type (ex: note) and id

Getting Started
Clone the repo
npm init -y
npm i -D eslint-config-airbnb-base eslint-plugin-import eslint-plugin-jest jest babel eslint babel-preset-env babel-eslint babel-register
npm i winston@next faker dotenv --save cowsay
npm i superagent
npm i uuid


Architecture
node, express, jQuery, javascript, babel

Credits:
Thanks to Judy, Seth, Michael and mob programming team.