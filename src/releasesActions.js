var Discogs = require("disconnect").Client;
var async = require("async");

var col = new Discogs().user().collection();

module.exports.fetchNewestReleaseFromArtistsForUsername = (username) => {
    return col.getReleases(username, 0, { page: 1, per_page: 1000 })
        .then((data) => {
            return fetchReleasesForArtists(data.releases);
        });
}

fetchReleasesForArtists = (releases) => {
    return new Promise((resolve, reject) => {
        if (releases) {
            var artistReleaseCollection = {};

            releases.forEach(release => {
                var releaseArtists = release.basic_information.artists;

                releaseArtists.forEach(artist => {
                    var releaseArtistName = artist.name;
                    var releaseTitle = release.basic_information.title;

                    if (!artistReleaseCollection[releaseArtistName]) {
                        artistReleaseCollection[releaseArtistName] = [];
                    }

                    artistReleaseCollection[releaseArtistName].push(releaseTitle);
                })
            });

            resolve(artistReleaseCollection);
        } else {
            reject(console.log('nee'));
            return;
        }
    });
}