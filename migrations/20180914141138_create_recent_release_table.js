
exports.up = function (knex, Promise) {
    return knex.schema.createTable('RECENT_RELEASE', function (table) {
        table.increments('RECENT_RELEASE_ID');
        table.integer('discogs_release_id').notNullable();
        table.string('title').notNullable();
        table.string('discogs_release_url');

        table.integer('ARTIST_ID', 10).unsigned().index().references('ARTIST_ID').inTable('ARTIST').onDelete('CASCADE');

    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('RECENT_RELEASE');
};
