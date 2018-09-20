class Artist {
    constructor(id, name) {
        this.discogs_artist_id = id;
        this.name = name;
    }

    set Id(id) {
        this.discogs_artist_id = id;
    }

    get Id() {
        return this.discogs_artist_id;
    }

    set Name(name) {
        this.name = name;
    }

    get Name() {
        return this.name;
    }
};

module.exports = Artist;