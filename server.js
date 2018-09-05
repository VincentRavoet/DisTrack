var app = require("express")();
var releasesActions = require("./src/releasesActions.js");

app.get("/getReleasesForUsername/:username", function (req, res) {
    var username = req.params.username;
    releasesActions.fetchNewestReleaseFromArtistsForUsername(username)
        .then((artistCollection) => {
            console.log('test');
            console.log('kak');
            res.send([artistCollection]);
        });
});

app.listen(3000);
