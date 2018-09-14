var config = require('../knexfile.js');
var cmd = require('node-cmd');
var env = 'development';
var knex = require('knex')(config[env]);

module.exports = knex;

knex.migrate.latest([config]);

module.exports.createArtist = function (artist) {
    return Promise.resolve().then(function () {
        return knex("artist").insert(artist);
    });
};

module.exports.migrateTables = function () {
    return Promise.resolve().then(function () {
        cmd.run('knex migrate:latest');
    });
}