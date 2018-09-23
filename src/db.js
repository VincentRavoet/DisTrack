const config = require('../knexfile.js');
const cmd = require('node-cmd');
const env = 'development';
const knex = require('knex')(config[env]);
const LastfmAPI = require('lastfmapi');
const Disconnect = require("disconnect");
const Discogs = Disconnect.Client;

const client = new Discogs(
    'SpinUp/1.0.0',
    {
        consumerKey: 'UkhOoJbzsZygZxSqiwwU',
        consumerSecret: 'LuvwuNvAZgsWXnwdIivUwHmDIqFLcbEc'
    });

const userCollection = client.user().collection();
const db = client.database();

const lastfm = new LastfmAPI({
    'api_key': '3d80c6e4dcdfbf7849574d4bfe167e1a',
    'secret': '7529f849f867aea77e676db0650e0d71'
});

module.exports = knex;
knex.migrate.latest([config]);

const ignoreIDs = [194];

module.exports.createArtist = (artist) => {
    if (!ignoreIDs.includes(artist.id)) {
        return new Promise((resolve, reject) => {
            getArtistImageLastfm(artist.name)
                .then((imageUrl) => {
                    artist.picture_url = imageUrl;
                    return knex.raw(knex('artist').insert(artist).toString().replace('insert', 'INSERT IGNORE'));
                })
        });
    }
};

module.exports.createRecentRelease = (recent_release) => {
    return Promise.resolve().then(() => {
        return knex.raw(knex("recent_release").insert(recent_release).toString().replace('insert', 'INSERT IGNORE'));
    })
};

module.exports.migrateTables = function () {
    return Promise.resolve().then(function () {
        cmd.run('knex migrate:latest');
    });
};

module.exports.getAllArtistIDs = () => {
    return new Promise((resolve, reject) => {
        knex('artist')
            .then((rows) => {
                let ids = [];

                rows.forEach(element => {
                    ids.push(element.DISCOGS_ARTIST_ID);
                });

                resolve(ids);
            });
    });
}

module.exports.getAllArtistsForUser = (username) => {
    return userCollection.getReleases(username, 0, { page: 1, per_page: 1000 })
        .then((data) => {
            let artistIDs = [];
            data.releases.forEach(release => {
                let releaseArtists = release.basic_information.artists;

                releaseArtists.forEach(artist => {
                    artistIDs.push(artist.id);
                })
            });

            return uniq(artistIDs);
        })
        .then((artistIDs) => {
            return knex('artist').whereIn('DISCOGS_ARTIST_ID', artistIDs);
        });
}

getArtistImageLastfm = (artistName) => {
    return new Promise((resolve) => {
        lastfm.artist.getInfo({
            'artist': artistName,
        }, (err, artist) => {
            try {
                let image;

                for (let i = 4; i > 0; --i) {
                    if (artist.image[i]) {
                        image = artist.image[i]['#text'];
                        break;
                    }
                }

                if (!image) {
                    image = 'NO PICTURE FOUND';
                }

                resolve(image);
            } catch (err) {
                resolve('NO PICTURE');
            }
        });
    });
};

module.exports.getRecentReleaseForArtist = (artistId) => {
    return new Promise((resolve) => {
        return knex('recent_release')
            .where({ discogs_artist_id: artistId })
            .then((rows) => {
                resolve(rows);
            });
    });
};

module.exports.getMostRecentReleasesForUserArtists = (username) => {
    return new Promise((resolve) => {
        return knex('artist')
            .where()
    });
}

/**
 * Return in een promise.
 * Resolve als het moet aflopen.
 */

// Custom shit.
let uniq = array => [...new Set(array)];