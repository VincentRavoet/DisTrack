
exports.up = function (knex, Promise) {
    return knex.schema.createTable('artist', function (table) {
        table.increments('id').primary();
        table.integer('discogs_artist_id');
        table.string('name');
    }).createTable('release', function (table) {
        table.increments('id').primary();
        table.integer('discogs_release_id');
        table.string('title');
        table.dateTime('release_date');
        table.string('discogs_release_url');
        table.integer('artist_id').unique().references('artist.id');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('artist')
        .dropTable('release');
};
