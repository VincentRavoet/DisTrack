var Discogs = require("disconnect").Client;
var async = require("async");

var col = new Discogs().user().collection();

fetchReleasesForUsername = (username) => {
    col.getReleases(username, 0, { page: 1, per_page: 1000 })
        .then((data) => {
            fetchNewestReleaseForArtist(data.releases);
        });
}

fetchNewestReleaseForArtist = (releases) => {
    return new Promise((resolve, reject) => {
        if (true) {
            var artists = [];

            for (var release in releases) {
                artists.push(release['basic_information']); // Index waarde van basic_information zien te vinden.
            }
            console.log(artists);
            resolve(artists);
        } else {
            reject(console.log('nee'));
        }
    });
}

module.exports.fetchAllArtistsForUser = (username) => {
    return fetchReleasesForUsername(username);
}