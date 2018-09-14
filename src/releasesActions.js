var Discogs = require("disconnect").Client;

var localdb = require('./db.js');

var client = new Discogs();
var userCollection = client.user().collection();
var db = client.database();

module.exports.fetchNewestReleaseFromArtistsForUsername = (username) => {
    return userCollection.getReleases(username, 0, { page: 1, per_page: 10 })
        .then((data) => {
            return fetchReleasesForArtists(data.releases);
        });
}

module.exports.updateReleases = () => {

}

// Fetch the most recent release for a specific artist.
fetchReleasesForArtists = (releases) => {
    return new Promise((resolve, reject) => {
        if (releases) {
            var artistReleaseCollection = {};
            releases.forEach(release => {
                var releaseArtists = release.basic_information.artists;
                releaseArtists.forEach(artist => {
                    var DBartist = { discogs_artist_id: artist.id, name: artist.name };
                    localdb.createArtist(DBartist);
                    var params = {
                        sort: 'year',
                        sort_order: 'desc',
                    };
                    db.getArtistReleases(artist.id, params, getMostRecentReleaseCallback);
                })
            });

            resolve(artistReleaseCollection);
        } else {
            reject(console.log('nee'));
        }
    });
};



var getMostRecentReleaseCallback = function (err, data, rateLimit) {
    var json = data.releases[0];
    console.log(json);
    var release = { discogs_release_id: json.id, title: json.title, discogs_release_url: json.resource_url };

    localdb.createRecentRelease(release);
}