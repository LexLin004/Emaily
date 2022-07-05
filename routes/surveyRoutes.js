const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const { mail } = require('sendgrid');
const _ = require('lodash'); // for parsing the click event info array from sendgrid
const { Path } = require('path-parser'); // for parsing the click event info array from sendgrid
const { URL } = require('url'); // for parsing the click event info array from sendgrid

const Survey = mongoose.model('surveys');

// create a new survey and send out a big email
module.exports = app => {
    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey.find({ _user: req.user.id })
            .select({ recipients: false });

        res.send(surveys);
    });

    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting!');
    });

    /** original version
    app.post('/api/surveys/webhooks', (req, res) => {
        const events = _.map(req.body, ({ email, url }) => {
            // extract only routes
            const pathname = new URL(url).pathname;
            // extract survey id and choice
            const p = new Path('/api/surveys/:surveyId/:choice');
            const match = p.test(pathname); // return null or an object contains id and choice
            if (match) {
                return { email: email, surveyId: match.surveyId, choice: match.choice };
            }
        });
        const compactEvents = _.compact(events); // return only event objects and no element will be null
        const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId'); // unique by email and surveyId
        res.send({});
    });
    */

    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice');

        _.chain(req.body)
            .map(({ email, url }) => {
                if (url) {
                    // extract only routes, extract survey id and choice
                    const match = p.test(new URL(url).pathname); // return null or an object contains id and choice
                    if (match) {
                        return { email: email, surveyId: match.surveyId, choice: match.choice };
                    }
                }
            })
            .compact() // return only event objects and no element will be null
            .uniqBy('email', 'surveyId') // unique by email and surveyId
            .each(({ surveyId, email, choice }) => {
                Survey.updateOne({
                    _id: surveyId,
                    recipients: {
                        $elemMatch: { email: email, responded: false }
                    }
                }, {
                    $inc: { [choice]: 1 },
                    $set: { 'recipients.$.responded': true },
                    lastResponded: new Date()
                }).exec();
                /** explanation: async!!! but do not need await b/c
                 * We do not have to wait for this query to finish before we send back a response.
                 * b/c we don't need to put in any type of checks to make sure that everything 
                 * like save or is it all done or do we need to respond with the records. (199.Executing Queries)
                 * look at the survey collection; find and update exactly one record inside that collection
                 * We want to find the survey with this given surveyId, who has a recipient with the given 
                 * email and has not yet responded to the survey
                 * after this one singular survey has been found, Make this following update to it.
                 * Increment the choice either yes or no by one, and update the recipient
                 * who we had just found in the original query. Update the respondent property to true
                 */
            })
            .value();
                
        res.send({});
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        /**
         *  1st: (requireLogin.js)
         * we want to make sure that the user is logged in.
         *  2nd:
         * if you are logged in, we also want to check to make sure that 
         * you have enough credits on hand to actually send out a survey.
         */
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title, // title : title
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        }); // create a instance of survey

        // send an email and customize(pass argument)
        const mailer = new Mailer(survey, surveyTemplate(survey));
        // send
        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user); // then header can be updated atuoly
        } catch (err) {
            res.status(422).send(err);
        }
    });
};

