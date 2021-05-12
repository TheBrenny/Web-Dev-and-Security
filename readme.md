# ZEIT3119 Web Dev and Security
> *z5217759 Jarod Brennfleck*

This was built using [NodeJS](https://nodejs.dev/) (a JS runtime framework), [Express](https://www.npmjs.com/package/express) (an easy to use web server package), and [scetch](https://www.npmjs.com/package/scetch) (a templating engine I wrote).

To run the server, execute `npm install && npm start`. You'll need NodeJS for this.

There is also a live version available at Heroku: https://web-dev-and-security.herokuapp.com/

## TODO:

Based on the feedback from the first assignment, the following todo tree has been made (including general improvements for Project 2):

 - [ ] Address feedback from Project 1
   - [x] Show quantity of items to the user in the cart.
   - [ ] ~~Update button to change the quantity or remove items from cart (instead of delete).~~ Not quantity anymore
   - [x] Add a sell page for users
   - [x] Total cost of cart is missing
   - [ ] Add a checkout button **(contest this in the Project 2 writeup)** Maybe show a smaller looking cart on each page?
 - [ ] Confirm that all parts of the assignment follow the MVC model
   - [ ] Turn the Database file into actual models.
   - [ ] Make a MD file labelling all the files and stating it's role in the MVC paradigm.
 - [ ] Add More Dynamic Pages
   - [ ] Add 5 more dynamic pages
 - [ ] Call the DB from the Controller of the MVC
   - [ ] Confirm that this actually happens
   - [ ] Have a "rich variety" of tables with varying data types
 - [ ] SQL Injection Prevention
   - [ ] Use PreparedStatements to prevent SQL Injections
   - [ ] Lookup Prepared Statements
   - [ ] Look for more areas to prevent injection
     - [ ] The search box!
     - [ ] Login form
     - [ ] Selling Box
     - [ ] Accidental open JSON endpoints!
 - [ ] Robust and functional website
 - [ ] Good presentation and easy to navigate
 - [ ] Submit zip file onto Moodle with Writeup, Project, and Database (`mysqldump`?)
 - [ ] Push to Github and confirm the Heroku instance!