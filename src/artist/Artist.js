class Artist {
    constructor(id, name, picture_url) {
        this.discogs_artist_id = id;
        this.name = name;
        this.picture_url = picture_url;
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

    set Picture_url(picture_url) {
        this.picture_url = picture_url;
    }

    get Picture_url() {
        return this.picture_url;
    }
};

module.exports = Artist;