var app = require("express")();
var db = require("./src/db.js");
var releasesActions = require("./src/releasesActions.js");

app.get("/getReleasesForUsername/:username", function (req, res) {
    var username = req.params.username;
    releasesActions.fetchNewestReleaseFromArtistsForUsername(username)
        .then((artistCollection) => {
            res.send([artistCollection]);
        });
});

app.listen(3000);
