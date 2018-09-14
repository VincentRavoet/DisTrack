var app = require("express")();
var db = require("./src/db.js");
var releasesActions = require("./src/releasesActions.js");

app.get("/", (req, res) => {
    res.sendFile('views/index.html', { root: __dirname })
});

app.get("/migrate", (req, res) => {
    db.migrateTables();
    res.send('Migrated beatch.');
});

app.get("/getReleasesForUsername/:username", (req, res) => {
    var username = req.params.username;
    releasesActions.fetchNewestReleaseFromArtistsForUsername(username)
        .then((artistCollection) => {
            res.send([artistCollection]);
        });
});

app.get("/updateReleases", (req, res) => {
    releasesActions.updateReleases().then(() => {
        res.send('jaboy');
    });
});

app.listen(3000);
