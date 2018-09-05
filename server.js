var app = require("express")();
var releasesActions = require("./src/releasesActions.js");

app.get("/getReleasesForUsername/:username", function (req, res) {
    var username = req.params.username;
    var releases = releasesActions.fetchAllArtistsForUser(username);

    res.send(releases);
});

app.listen(3000);
