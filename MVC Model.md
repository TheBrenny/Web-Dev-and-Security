# The MVC Model

This project was developed with the MVC Model in mind from day 1, because it is the most efficient way to implement a website/web app. This file identifies which pieces of this project match up to which part of the `Model View Controller` model.

## Model

These files allow the controller to send and receive information from the database in a safe, robust, functional, and low-footprint way. The `./db/*.js` files hold all the code to connect and interacti with the database.

## View

The views are powered by [`scetch`](https://github.com/TheBrenny/scetch) which is an easy to use and minimal templating engine. The `./app/views/` folder holds all the views.

## Controller

The web server is powered by [`express`](https://expressjs.com/), and as such, my code is in control of all the requests that come in. The main server file is found at `./server.js`, which then `require`s the main controller file, `./app/server.js`, which further includes `./app/routes/public.js` and in turn includes all other files in the `./app/routes/` folder.

## Additional Files

There are a number of additional files which make this project work:

- Front-end assets can be found in `./app/assets/`
- The following files assist in the functioning of the project:
  - `./config.js` - Holds all the application configuration settings (which are set on startup).
  - `./errorRouter.js` - The controller for handling errors or non-existent URIs.
  - `./install.js` - A standalone app which installs the project (installs the required database).
  - `./Procfile` - The deployment profile for [Heroku](https://www.heroku.com).
  - `./util_and_polyfill.js` - Adds some helper functions to NodeJS.
- The following files assist in the developmnnt of the project:
  - `./.gitignore` - Allows me to ignore certain files from being pushed to github deployed or deployed to Heroku.
  - `./gulpfile.js` - Using the packages `gulp`, `nodemon`, and `browser-sync`, I can rapidly prototype server-side and client-side code without manually restarting the server or browser.
  - `./package.json` - Holds all NodeJS-related information about the project, such as run commands, dependancies, and information.