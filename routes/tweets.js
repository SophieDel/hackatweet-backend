var express = require("express");
var router = express.Router();
const Tweet = require('../models/tweets');


router.get("/", (req, res) => {
  Tweet.find().then(data => 
    res.json({result: true, tweets: data}))
    .catch(error => console.log(error))
})


router.post("/new", (req, res) => {
  console.log("req.body.tweet =>", req.body.tweet)
  const rawTweet = req.body.tweet;
  // const hashtagPattern = /#[a-z0-9_]+/gi;
  // Mettre le tweet sous forme d'array
  const contentInArray = rawTweet.split(" ")
  // Isoler les hashtage dans le Tweet
  const hashtagPattern = /[#\w*]/
  const hashtagsArray = (contentInArray.filter(e => e[0] == '#')).map(e => e.toLowerCase())
  // Chaque hashtag est unique
  const hashtags = hashtagsArray ? [
    ...new Set(hashtagsArray)
  ] : [];
  const newTweet = new Tweet({
    rawTweet: rawTweet,
    contentInArray: contentInArray,
    hashtags: hashtags
  });
  newTweet.save().then(data => {
    console.log(data)
    res.json({result: true, tweet: newTweet})
  }).catch(console.error())
});

module.exports = router;
