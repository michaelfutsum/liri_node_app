require("dotenv").config();
var action = process.argv[2];
var value = process.argv[3];
var keys = require("./keys.js");
var Twitter = require("twitter");
var request = require("request");
var Spotify = require("node-spotify-api");
var fs = require("fs");
//console.log (keys.twitter);
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
// TWITTER
function myTweets() {
  var params = { screen_name: "mpneuman" };
  client.get("statuses/user_timeline", params, function(
    error,
    tweets,
    response
  ) {
    if (error) {
      console.log(error);
    } else {
      console.log("\n///*****///TWEET ME///*****///\n");
      for (i = 0; i < tweets.length; i++) {
        console.log(i + 1 + ". " + tweets[i].text);
      }
    }
  });
}
//SPOTIFY
function spotifyThis() {
  console.log("here");
  spotify.search(
    { type: "track", query: value || "ace of base the sign" },
    function(err, data) {
      if (err) {
        console.log("Error occurred: " + err);
        return;
      } else {
        var spotifyCall = data.tracks.items[0];
        console.log("\n///*****///SPOTIFY THIS///*****///\n");
        var artist = spotifyCall.artists[0].name;
        console.log("Artist: " + artist);
        var song = spotifyCall.name;
        console.log("Song name: " + song);
        var preview = spotifyCall.preview_url;
        console.log("Preview Link: " + preview);
        var album = spotifyCall.album.name;
        console.log("Album: " + album);
      }
    }
  );
}
//MOVIE
function movieThis() {
  console.log(value);
  var request = require("request");
  var movieName = value;
  var movieDefault = "Mr.Nobody";
  var url =
    "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  var urlDefault =
    "http://www.omdbapi.com/?t=" + movieDefault + "&y=&plot=short&r=json";
  // request(url, function(err, response, body){
  // },
  request(url, function(error, response, body) {
    if (movieName != null) {
      if (!error && response.statusCode == 200) {
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Released: " + JSON.parse(body).Year);
        console.log("IMBD rating: " + JSON.parse(body).Ratings[0].Value);
        console.log("Country produced: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors/Actresses: " + JSON.parse(body).Actors);
      }
    }
    // if no value entered, value will be set to Mr.Nobody
    else {
      request(urlDefault, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log("Title: " + movieDefault);
          console.log("Year: " + JSON.parse(body)["Year"]);
          console.log("Rating: " + JSON.parse(body)["imdbRating"]);
          console.log("Country of Production: " + JSON.parse(body)["Country"]);
          console.log("Language: " + JSON.parse(body)["Language"]);
          console.log("Plot: " + JSON.parse(body)["Plot"]);
          console.log("Actors: " + JSON.parse(body)["Actors"]);
        }
      });
    }
  });
}

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }

    console.log(data);

    whatDoNow = data.split(",");
    whatDo = whatDoNow[0];
    argument = whatDoNow[1];
    start();
  });
}

function start() {
  switch (action) {
    case "my-tweets":
      myTweets();
      break;
    case "spotify-this-song":
      spotifyThis();
      break;
    case "movie-this":
      movieThis();
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:
  }
}
start();
