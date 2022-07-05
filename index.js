// run npm run dev

// create a brand new express app, and then add some logic to create first root handler

//nodejs only support common js modules
const express = require('express'); // import express library
const mongoose = require('mongoose');

const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser'); // express middleware

const keys = require('./config/keys');

require('./models/User');
require('./models/Survey'); 
require('./services/passport.js'); // no need return things from passport

mongoose.connect(keys.mongoURI);

const app = express(); // express application

app.use(bodyParser.json());

/**
 * tell Express that it needs to make use of cookies inside of our application.
 * middleware, our small functions that can be used to modify incoming requests to our app before they are sent off to route handlers.
 */
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // how long this cookie can exist inside the browser before it is automatically expired
        keys: [keys.cookieKey] // used to sign or encrypt our cookie.
    })
);

/** tell Passport that it should make use of cookies to handle authentication. */
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes.js')(app);
require('./routes/billingRoutes.js')(app);
require('./routes/surveyRoutes.js')(app);

if (process.env.NODE_ENV === 'production') {
    /** Express will serve up production assets, like out main.js file, or main.css */
    app.use(express.static('client/build'));

    /** Express will serve up the index.html file, if it does not recognize the route */
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

/**
 * Deployment Checklist (HEROKU) (Need to do for every new project with HEROKU)
 * Dynamic Port Binding : Heroku tells us which port our app will use, so we need to make sure we listen to the port they tell us to
 * (b/c Hiroku will host many different applications on a single server or a single machine)
 * Specify Node Environment : We want to use a specific version of node, so we need to tell Heroku which version we want
 * Specify start script : Instruct Heroku what command to run to start our server running
 * Create .gitignore file : We don't want to include dependencies, Heroku will do that for us
 */

// Dynamic Port Binding
const PORT = process.env.PORT || 5000; // look at the underlying environment and see if they have declared a port for us to use.
// in development environment, use 5000 b/c this variable might not actually be defined

app.listen(PORT);
// This line instructs Express to tell Node that it wants to listen for incoming traffic on Port 5000.

// Specify Node Environment (DONE in package.json - Engines)
// Specify start script (DONE in package.json - scripts)
// Create .gitignore file



// Deploy App with git
// the address that will navigate to whenever we want to visit our application inside the browser.
// https://serene-refuge-47001.herokuapp.com/
// We are now going to push that repository to this remote repository that is managed by Hiroku. 
// The instant we push our repository to this remote one, Hiroku will take that as a signal that it needs
// to deploy our application and start it up automatically.
// https://git.heroku.com/serene-refuge-47001.git

// redeploy
// save all files
// command: git status
//          git add .
//          git commit -m "changed greeting"
//          git push heroku master
//          heroku open to verify