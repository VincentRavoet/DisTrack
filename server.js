var app = require("express")();
var releasesActions = require("./src/releasesActions.js");

app.get("/getReleasesForUsername/:username", function (req, res) {
    var username = req.params.username;
    releasesActions.fetchReleasesForUsername(username)
        .then(function (releases) {
            res.send(releases);
        })
        .catch(function (error) {
            res.send(error);
        });
});

app.listen(3000);
