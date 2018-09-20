const express = require("express");
const app = express();
const path = require('path');
const db = require("./src/db.js");
const releasesActions = require("./src/releasesActions.js");

app.use(express.static(path.join(__dirname, 'public')));


app.get("/", (req, res) => {
    res.sendFile('views/index.html', { root: __dirname })
});

app.get("/migrate", (req, res) => {
    db.migrateTables();
    res.send('Migrated beatch.');
});

app.get("/lastfm", (req, res) => {
    releasesActions.lastfm();
    res.send('Migrated beatch.');
});

app.get("/getArtistsForUsername/:username", (req, res) => {
    const username = req.params.username;
    releasesActions.getArtistsForUsername(username)
        .then((artistCollection) => {
            res.send([artistCollection]);
        });
});

app.get("/updateReleaseForAllArtists", (req, res) => {
    releasesActions.updateReleases().then(() => {
        res.send('jaboy');
    });
});

app.get("/getRecentReleaseForArtist/:id", (req, res) => {
    const id = req.params.id;
    releasesActions.getRecentReleaseForArtist(id)
        .then((recentRelease) => {
            res.send('recentRelease');
        });
});

app.listen(3000);

/**
 * Application name	    DisTrack
 * API key	            3d80c6e4dcdfbf7849574d4bfe167e1a
 * Shared secret	    7529f849f867aea77e676db0650e0d71
 * Registered to	    ColdMarijke
 */