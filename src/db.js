var config = require('../knexfile.js');
var cmd = require('node-cmd');
var env = 'development';
var knex = require('knex')(config[env]);

module.exports = knex;

knex.migrate.latest([config]);

module.exports.createArtist = (artist) => {
    return Promise.resolve().then(() => {
        return knex.raw(knex('artist').insert(artist).toString().replace('insert', 'INSERT IGNORE'));
    });
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
                var ids = [];

                rows.forEach(element => {
                    ids.push(element.DISCOGS_ARTIST_ID);
                });

                resolve(ids);
            });
    });
}