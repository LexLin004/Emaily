// create our mongoose model class
const mongoose = require('mongoose');

const { Schema } = mongoose; // const Schema = mongoose.Schema; 
// (ES2015 const 'Schema' = mongoose.'Schema', so can use ES2015 destructuring (=condensed down to)) 

/**
 * use this schema object to create a schema for this new collection.
 * The schema will describe what every individual property or assuming every individual record is going to look like.
 * mongoose needs all things, even it is null
 */
const userSchema = new Schema({
    googleId: String,
    credits: { type: Number, default: 0 }
});

mongoose.model('users', userSchema); // name of collection, user schema