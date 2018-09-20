const Disconnect = require("disconnect");
const Discogs = Disconnect.Client;
const localdb = require('./db.js');
const Artist = require('./artist/Artist.js');
const RecentRelease = require('./recent_release/RecentRelease.js');

const client = new Discogs(
    'SpinUp/1.0.0',
    {
        consumerKey: 'UkhOoJbzsZygZxSqiwwU',
        consumerSecret: 'LuvwuNvAZgsWXnwdIivUwHmDIqFLcbEc'
    });

const userCollection = client.user().collection();
const db = client.database();

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
                let counter = 1000;
                console.log(artistIDs.length);
                artistIDs.forEach(id => {
                    const params = { sort: 'year', sort_order: 'desc' };

                    setTimeout(() => {
                        db.getArtistReleases(id, params, (err, data, rateLimit) => {
                            err ? console.log(err) : console.log('Artist ID: ' + id);
                            if (data && data.hasOwnProperty('releases')) {
                                const json = data.releases[0];
                                const release = new RecentRelease(json.id, json.title, json.resource_url, id);

                                localdb.createRecentRelease(release);
                            }
                        });
                    }, counter);
                    counter += 1100;
                });
            })
    });
};

module.exports.getRecentReleaseForArtist = (id) => {
    return new Promise((resolve) => {
        localdb.getRecentReleaseForArtist(id)
            .then((release) => {
                console.log(release);
            });
    })
};

/**
 * Create new entries for every artist in the user's collection.
 */
createArtistsForUsername = (releases) => {
    return new Promise((resolve, reject) => {
        try {
            releases.forEach(release => {
                let releaseArtists = release.basic_information.artists;

                releaseArtists.forEach(artist => {
                    artistName = artist.name.replace(/ \(\d+\)/, '');

                    const DBartist = new Artist(artist.id, artistName);

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