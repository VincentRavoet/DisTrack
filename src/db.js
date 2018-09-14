var config = require('../knexfile.js');
var cmd = require('node-cmd');
var env = 'development';
var knex = require('knex')(config[env]);

module.exports = knex;

knex.migrate.latest([config]);

module.exports.createArtist = (artist) => {
    var artist = artist;
    return knex.raw(knex('artist').insert(artist).toString().replace('insert', 'INSERT IGNORE'));
};

module.exports.createRecentRelease = (recent_release) => {
    return Promise.resolve().then(() => {
        return knex("recent_release").insert(recent_release);
    })
}

module.exports.migrateTables = function () {
    return Promise.resolve().then(function () {
        cmd.run('knex migrate:latest');
    });
}