const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    app.post('/api/stripe', requireLogin, async (req, res) => {
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id
        });
        
        /**
         * take the user model or the model representing the person who just made this request.
         * We will add five credits to them and then we'll send the user model back to the client.
         * So we will essentially respond to the request with the newly updated user model.
         */
        // get a reference to the current user model, the person who just made this request
        // access the current user model as req.user. (by passport.initialize, .session() in server/index.js) (113)
        req.user.credits += 5; // Just modifying the user right here doesn't actually save any changes to our database.
        const user = await req.user.save(); // take the model and persist it to our database.

        res.send(user);
    });
};