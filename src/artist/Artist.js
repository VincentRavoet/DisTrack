class Artist {
    constructor(id, name, picture) {
        this.discogs_artist_id = id;
        this.name = name;
        this.picture = picture;
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

    set Picture(picture) {
        this.picture = picture;
    }

    get Picture() {
        return this.picture;
    }
};

module.exports = Artist;