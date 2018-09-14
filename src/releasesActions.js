var Discogs = require("disconnect").Client;
var localdb = require('./db.js');

var client = new Discogs({
    consumerKey: 'UkhOoJbzsZygZxSqiwwU',
    consumerSecret: 'LuvwuNvAZgsWXnwdIivUwHmDIqFLcbEc'
});

var userCollection = client.user().collection();
var db = client.database();


module.exports.fetchNewestReleaseFromArtistsForUsername = (username) => {
    return userCollection.getReleases(username, 0, { page: 1, per_page: 1000 })
        .then((data) => {
            return fetchReleasesForArtists(data.releases);
        });
}

module.exports.updateReleases = () => {
    return Promise.resolve().then(() => {
        var params = {
            sort: 'year',
            sort_order: 'desc',
        };

        localdb.getAllArtistIDs()
            .then((artistIDs) => {
                artistIDs = artistIDs.slice(1, 20);
                artistIDs.forEach(id => {


                    // ASYNC
                    db.getArtistReleases(id, params, (err, data, rateLimit) => {
                        if (data.hasOwnProperty('releases')) {
                            var json = data.releases[0];
                            var release = { discogs_release_id: json.id, title: json.title, discogs_release_url: json.resource_url, discogs_artist_id: id };

                            localdb.createRecentRelease(release);
                        }
                    });
                });
            })
    });
}

// Fetch the most recent release for a specific artist.
fetchReleasesForArtists = (releases) => {
    return new Promise((resolve, reject) => {
        var artistReleaseCollection = {};
        releases.forEach(release => {
            var releaseArtists = release.basic_information.artists;
            releaseArtists.forEach(artist => {
                var DBartist = { discogs_artist_id: artist.id, name: artist.name };
                localdb.createArtist(DBartist);
            })
        });
        resolve(artistReleaseCollection);
    });
};