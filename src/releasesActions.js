var Discogs = require("disconnect").Client;

var client = new Discogs();
var col = client.user().collection();
var db = client.database();

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
            var relSlice = releases.slice(1, 2);
            relSlice.forEach(release => {
                var releaseArtists = release.basic_information.artists;

                releaseArtists.forEach(artist => {
                    var releaseArtistID = artist.id;
                    var releaseTitle = release.basic_information.title;
                    var params = {
                        sort: 'year',
                        sort_order: 'desc',
                    }

                    // Deze functie haalt de meest recente release voor een artist uit Discogs.
                    db.getArtistReleases(5003, params, artistReleasesCallback);



                    if (!artistReleaseCollection[releaseArtistID]) {
                        artistReleaseCollection[releaseArtistID] = [];
                    }

                    artistReleaseCollection[releaseArtistID].push(releaseTitle);
                })
            });

            resolve(artistReleaseCollection);
        } else {
            reject(console.log('nee'));
            return;
        }
    });
};

var artistReleasesCallback = function (err, data, rateLimit) {
    console.log(data.releases[0]);
}