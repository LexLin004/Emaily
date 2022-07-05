/**
 * Google OAuth flow
 * Passport JS handles vast majorities of the flow, but not the entire thing.
 * 2 Lib:
 * 1: passport; 2.passport strategy(see 05)
 * 
 * Create by using Google Project Setup with new UI
 * (https://www.udemy.com/course/node-with-react-fullstack-web-development/learn/lecture/19049632#overview)
 * client ID: 
 * meaning: pubilc token - we can share this with the public
 * client secret: 
 * meaning: private token - we do not want anyone to see this
 * how we can securely store our client secret inside of our project and make sure that we do not accidentally push it up to GitHub.
 */
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');
/**
 * one argument means we are trying to fetch something out of mongoose.
 * Two arguments means we're trying to load something into it.
 */

passport.serializeUser((user, done) => {
    done(null, user.id); // _id eg. _id:62ab97cc4623b5a30d515d60
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    }); // promise
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback', // the route that the user will be sent to after they grant permissions to our application
            proxy: true
        }, 
        async (accessToken, refreshToken, profile, done) => {
            // need to test whether this user is exist in the db
            const existingUser = await User.findOne({ googleId: profile.id }); // return promise (asynchronise action)
            if (existingUser) {
                // already have a record with the given profile ID
                return done(null, existingUser); //error, user record
            }
            // dont have, need to make a new record
            const user = await new User({ googleId: profile.id }).save();
            done(null, user);
        }
    )
); 
// New Google strategy creates a new instance of the Google passport strategy.
// passport.use: Passpoat, I want you to be aware that there is a new strategy available and here it is, make use of it.
// Understand that users can use this to authenticate themselves inside of our application.
/**
 * if write (accessToken, refreshToken, profile) => {/console all of them/}
 * the profile one will print the profile of the user
 * use this root handler
 * app.get('/auth/google/callback', passport.authenticate('google'));
 * accessToken essentially allows us to reach back over to Google and say, hey, in the past,
 * this user said that we could read their profile or that we could add or delete emails inside their email inbox.
 * The access token automatically expires after some amount of time, and we can be given optionally a
 * Refresh token that allows us to automatically update the access token and essentially reach into the
 * users account for some additional amount of time.
 */