var app = require("express")();
var db = require("./src/db.js");
var releasesActions = require("./src/releasesActions.js");

app.get("/", function (req, res) {
    res.sendFile('views/index.html', { root: __dirname })
});

app.get("/migrate", function (req, res) {
    db.migrateTables();

    res.send('Migrated beatch.');
});

app.get("/getReleasesForUsername/:username", function (req, res) {
    var username = req.params.username;
    releasesActions.fetchNewestReleaseFromArtistsForUsername(username)
        .then((artistCollection) => {
            res.send([artistCollection]);
        });
});

app.listen(3000);
