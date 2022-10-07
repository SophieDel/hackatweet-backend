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
  const hashtagPattern = /#[a-z0-9_]+/gi;
  // Isoler les hashtages du tweet
  const hashtagsArray = rawTweet.match(hashtagPattern);
  // Supprimer les hashtag du content
  const content = hashtagsArray ? rawTweet.split(" ").filter((e) => !hashtagsArray.includes(e)).join(" ") : rawTweet
  // Chaque hashtag est unique
  const hashtags = hashtagsArray ? [
    ...new Set(hashtagsArray.map((e) => e.slice(1).toLowerCase()))
  ] : [];
  const newTweet = new Tweet({
    rawTweet: rawTweet,
    content: content,
    hashtags: hashtags
  });
  newTweet.save().then(data => {
    console.log(data)
    res.json({result: true, tweet: newTweet})
  }).catch(console.error())
});

module.exports = router;
