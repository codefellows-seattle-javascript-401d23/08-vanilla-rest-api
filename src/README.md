# Vanilla-REST-API
**Author**: Sarah B
**Version**: 1.0.2 (increment the patch/fix version number up if you make more commits past your first submission)
## Overview
Building a a vanilla api using local storage to cache items and make them available via a restful API using the httpie in the CLI.
## Getting Started
Install all dependencies
## Architecture
Uses the node.js library especially httpie for the CLI API requests. 
## Change Log
1.0.0- Application has functional GET, POST, GET ALL and DELETE routes via CLI, but testing is buggy
1.0.2  - Application now has fully-functional GET, POST, GET ALL and DELETE routes via CLI, and all tests are passing in the backend.
## Credits and Collaborations


## to run
in the CLI
type node index.js
then in another tab type:

you must post before anything else because nothing is stored

http POST :3000/api/v1/tree title=__ content=____
http GET :3000/api/v1/tree title==__ content==____
http GET ALL :3000/api/v1/trees 
http DELETE :3000/api/v1/tree title=__ content=__
http PUT --- NOT IMPLIMENTED