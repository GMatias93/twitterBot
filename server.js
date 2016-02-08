var Twitter = require('twitter');
var express = require('express');
var keys = require('./config');
var app = express();
var port = process.env.port || 8300;

var twit = new Twitter({
  consumer_key: keys.TWITTER_CONSUMER_KEY,
  consumer_secret: keys.TWITTER_CONSUMER_SECRET,
  access_token_key: keys.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: keys.TWITTER_ACCESS_TOKEN_SECRET,
});

var latestMentions = [];
var idStrings = {};

app.get('/*', function(req, res) {
  res.send('Hello World');
});

var server = app.listen(port, function() {
  console.log('Basic server listening on ' + port);
});

var getMentions = function() {
  twit.get('/statuses/mentions_timeline.json', { count: 10 },
  function(error, data) {
    if (error) {
      console.error(error);
    }

    for (var i = 0; i < data.length; i++) {
      var currentTweet = data[i];
      if (!idStrings[currentTweet.id_str]) {
        idStrings[currentTweet.ed_str] = true;
        var tweetObj = {
          user: currentTweet.user.screen_name,
          text: currentTweet.text,
        };
        latestMentions.push(tweetObj);
      }
    }

    console.log(idStrings);
    console.log(latestMentions);
  });

};

getMentions();
