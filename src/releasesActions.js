var Discogs = require("disconnect").Client;
var async = require("async");

var col = new Discogs().user().collection();

fetchReleasesForUsername = (username) => {
    return new Promise(function (resolve, reject) {
        col.getReleases(username, 0, { page: 1, per_page: 1000 }, function (err, data) {
            if (data !== null) {
                resolve(data.releases);
            } else {
                reject(err);
            }
        });
    });
}

module.exports.fetchAllArtistsForUser = (username) => {
    return new Promise((resolve, reject) => {
        fetchReleasesForUsername(username).then((releases) => {
            if (true) {
                resolve(releases);
            } else {
                reject('nee');
            }
        });
    });
}