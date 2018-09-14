var Discogs = require("disconnect").Client;

var localdb = require('./db.js');

var client = new Discogs();
var userCollection = client.user().collection();
var db = client.database();

module.exports.fetchNewestReleaseFromArtistsForUsername = (username) => {
    return userCollection.getReleases(username, 0, { page: 1, per_page: 1 })
        .then((data) => {
            return fetchReleasesForArtists(data.releases);
        });
}

// Fetch the most recent release for a specific artist.
fetchReleasesForArtists = (releases) => {
    return new Promise((resolve, reject) => {
        if (releases) {
            var artistReleaseCollection = {};
            releases.forEach(release => {
                var releaseArtists = release.basic_information.artists;

                releaseArtists.forEach(artist => {
                    var releaseArtistID = artist.id;

                    //Knal eerst de artist in de DB.
                    var artist = { discogs_artist_id: releaseArtistID, name: artist.name };
                    localdb.createArtist(artist);

                    var params = {
                        sort: 'year',
                        sort_order: 'desc',
                    };

                    db.getArtistReleases(releaseArtistID, params, getMostRecentReleaseCallback);

                    console.log(kak);

                })
            });

            resolve(artistReleaseCollection);
        } else {
            reject(console.log('nee'));
        }
    });
};

var getMostRecentReleaseCallback = function (err, data, rateLimit) {
    //console.log(data);
}