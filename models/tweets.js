const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    date: { type: Date, default: Date.now },
    rawTweet : String,
    firstname: {type: String, "default": "John"},
    username: {type: String, "default": "@JohnCena"},
  contentInArray: { type : Array , "default" : [] },
  hashtags: { type : Array , "default" : [] }})

const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;