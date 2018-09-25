class RecentRelease {
    constructor(releaseId, title, releaseUrl, picture_url, id) {
        this.discogs_release_id = releaseId;
        this.title = title;
        this.discogs_release_url = releaseUrl;
        this.picture_url = picture_url;
        this.discogs_artist_id = id;
    }

    set DiscogsReleaseId(id) {
        this.discogs_release_id = id;
    }

    get DiscogsReleaseId() {
        return this.discogs_release_id;
    }

    set Title(title) {
        this.title = title;
    }

    get Title() {
        return this.title;
    }

    set DiscogsReleaseUrl(url) {
        this.discogs_release_url = url;
    }

    get DiscogsReleaseUrl() {
        return this.discogs_release_url;
    }

    set Picture_url(url) {
        this.picture_url = url;
    }

    get Picture_url() {
        return this.picture_url;
    }

    set DiscogsArtistId(id) {
        this.discogs_artist_id = id;
    }

    get DiscogsArtistId() {
        return this.discogs_artist_id;
    }
};

module.exports = RecentRelease;