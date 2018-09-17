const config = require('../knexfile.js');
const cmd = require('node-cmd');
const env = 'development';
const knex = require('knex')(config[env]);
const LastfmAPI = require('lastfmapi');

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

/**
 * Return in een promise.
 * Resolve als het moet aflopen.
 */