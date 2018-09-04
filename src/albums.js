var Discogs = require("disconnect").Client;
var async = require("async");

var db = new Discogs().database();
var col = new Discogs().user().collection();

var getAllReleasesForUser = async function () {
    var releases = await getReleases();

    return releases;
};

function getReleases() {
    return new Promise(function (resolve, reject) {
        var releases = null;
        col.getReleases("Rudebwoy1", 0, { page: 1, per_page: 1000 }, function (err, data) {
            releases = data.releases;
        });
        resolve(releases);
    });
}

module.exports.getAllReleasesForUser = getAllReleasesForUser;
