const passport = require('passport');
// need app from index.js
module.exports = (app) => {
    // whenever a user goes to /auth/google, we should then start the entire Oauth process being managed by Passport
    app.get(
        '/auth/google',
        passport.authenticate('google' /** refer to GoogleStrategy */, {
            scope: ['profile', 'email']
        })
    ); // tell Express to involve passport, pass the user off to passport, where they will then be kicked into this authentication flow.
    // passport attempt to authenticate the user who is coming in on this route and use the strategy called Google.
    // scope: ['profile', 'email']: scope specifies to Google, like the actual Google servers, what access we want to have inside of this user's profile.

    /**
     * 2nd root handler
     * handle the case in which the user visits the Google oauth callback. (Passport)
     */
    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/surveys');
        }
    );

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
         res.send(req.user);
    });

    // create a root handler and associated with a given route
    // app.get('/', (req, res) => { // arrow function with 2 arguments rec, res
    //     res.send({ bye: 'buddy' });
    // });
    /**
     * app => express app to register this route handler with (represents the underlying running express server.
     * The express server has some number of root handlers associated with it.)
     * (By calling app DOT get by calling that function get, we are creating a brand new root handler.)
     * get => watch for incoming requestes with this method
     * (tells express that we want to create a root handler that is watching for incoming HTTP requests with a very specific method.)
     * '/' => watch for requests trying to access '/'.
     * (tells express to watch for incoming requests that are attempting to access some very particular routes.(localhost:5000/))
     * req => object representing the incoming request
     * res => object representing the outgoing response
     * res.send({ hi: 'there' }) => immediately send some JSON back to who ever made this request
     * arrow function : is called automatically by express Any time some request comes into this route right here,'/''.
     */

    // app.get('/greeting', (req, res) => { // arrow function with 2 arguments rec, res
    //     res.send({ hi: 'greeting' });
    // });
    /** 
    * '/greeting' => watch for requests trying to access '/greeting'.
    * (tells express to watch for incoming requests that are attempting to access some very particular routes.(localhost:5000/greeting))
    */
};

