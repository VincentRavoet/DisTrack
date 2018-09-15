var Disconnect = require("disconnect");
var Discogs = Disconnect.Client;
var localdb = require('./db.js');
var _ = require("lodash");

var client = new Discogs(
    'SpinUp/1.0.0',
    {
        consumerKey: 'UkhOoJbzsZygZxSqiwwU',
        consumerSecret: 'LuvwuNvAZgsWXnwdIivUwHmDIqFLcbEc'
    });

var userCollection = client.user().collection();
var db = client.database();

/**
 * Get all artists in the user's collection.
 * 
 * @param {string} username 
 */
module.exports.getArtistsForUsername = (username) => {
    return userCollection.getReleases(username, 0, { page: 1, per_page: 1000 })
        .then((data) => {
            return createArtistsForUsername(data.releases);
        });
}

/**
 * Update all the releases in the database.
 */
module.exports.updateReleases = () => {
    return Promise.resolve().then(() => {
        localdb.getAllArtistIDs()
            .then((artistIDs) => {
                var counter = 1000;
                console.log(artistIDs.length);
                artistIDs.forEach(id => {
                    var params = { sort: 'year', sort_order: 'desc' };

                    setTimeout(() => {
                        db.getArtistReleases(id, params, (err, data, rateLimit) => {
                            err ? console.log(err) : console.log('Artist ID: ' + id);
                            if (data && data.hasOwnProperty('releases')) {
                                var json = data.releases[0];
                                var release = { discogs_release_id: json.id, title: json.title, discogs_release_url: json.resource_url, discogs_artist_id: id };

                                localdb.createRecentRelease(release);
                            }
                        });
                    }, counter);
                    counter += 1010;
                });
            })
    });
}

/**
 * Create new entries for every artist in the user's collection.
 */
createArtistsForUsername = (releases) => {
    return new Promise((resolve, reject) => {
        try {
            releases.forEach(release => {
                var releaseArtists = release.basic_information.artists;

                releaseArtists.forEach(artist => {
                    artistName = artist.name.replace(/ \(\d+\)/, '');
                    var DBartist = { discogs_artist_id: artist.id, name: artistName };
                    localdb.createArtist(DBartist);
                })
            });
            resolve('Successfully created new artists!');
        } catch (err) {
            console.log('fetchReleasesForArtists: ' + err);
            reject('Something went wrong...');
        }
    });
};