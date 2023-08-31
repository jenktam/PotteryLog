# Backend

# Getting Starts
Run `npm run start`

# File Architecture
* /index.js - Where node.js server uses express as a web server. Also starting point for all routes.
* /connect.js - where connection to MySQL database is instantiated.
* .env - where all environment variables, config data, and database connection options for the MySQL database are saved
* /routes/*
  * location for all API routes. 
  * Forward the supported requests(and info encoded in request URLs) to appropriate controller functions
* /controllers/*
  *  location for all controller functions, which get the requested data and return it to the client on the web browser.