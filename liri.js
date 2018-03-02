require("dotenv").config();

var keys = require("./keys.js");
var request = require("request");
var Twitter = require('twitter');
var spotify = require("spotify");
var fs = require("fs");

//console.log (keys.twitter);
var spotify = new spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var command = process.argv[2];
var commandArgument = process.argv[3];

var params = {screen_name: 'mpneuman'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});