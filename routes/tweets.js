var express = require("express");
var router = express.Router();
const Tweet = require('../models/tweets');

router.post("/new", (req, res) => {
  const rawTweet = req.body.content;
  const hashtagPattern = /#[a-z0-9_]+/gi;
  // Isoler les hashtages du tweet
  const hashtagsArray = rawTweet.match(hashtagPattern);
  // Supprimer les hashtag du content
  const content = rawTweet.split(" ").filter((e) => !hashtagsArray.includes(e)).join(" ");
  // Chaque hashtag est unique
  const hashtags = [
    ...new Set(hashtagsArray.map((e) => e.slice(1).toLowerCase())),
  ];
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
