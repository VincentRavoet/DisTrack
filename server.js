var express = require("express");
var app = express();
var albums = require("./src/albums.js");

app.get("/listUsers", function(req, res) {
  var allReleases = albums.getAllReleasesForUser(); // Opzoeken hoe await werkt.

  res.send(allReleases);
});

app.listen(3000);
