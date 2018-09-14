
exports.up = function (knex, Promise) {
    return knex.schema.createTable('RECENT_RELEASE', function (table) {
        table.integer('DISCOGS_RELEASE_ID').unsigned().notNullable().primary();
        table.string('title').notNullable();
        table.string('discogs_release_url');
        table.integer('DISCOGS_ARTIST_ID').unsigned().index().references('DISCOGS_ARTIST_ID').inTable('ARTIST').onDelete('CASCADE');

    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('RECENT_RELEASE');
};
