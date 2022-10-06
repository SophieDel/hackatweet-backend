const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    date: { type: Date, default: Date.now },
    rawTweet : String,
  content: String,
  hashtags: { type : Array , "default" : [] }})

const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;