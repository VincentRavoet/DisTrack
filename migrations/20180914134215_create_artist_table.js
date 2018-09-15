
exports.up = function (knex, Promise) {
    return knex.schema.createTable('ARTIST', function (table) {
        table.integer('DISCOGS_ARTIST_ID').unsigned().notNullable().primary();
        table.string('name').notNullable();
        table.string('picture_url');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('ARTIST');
};
