
exports.up = function (knex, Promise) {
    return knex.schema.createTable('ARTIST', function (table) {
        table.increments('ARTIST_ID');
        table.integer('discogs_artist_id').notNullable();
        table.string('name').notNullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('ARTIST');
};
