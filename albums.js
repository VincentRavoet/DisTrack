var Discogs = require("disconnect").Client;

var db = new Discogs().database();
var col = new Discogs().user().collection();

var getAllReleasesForUser = async function() {
  var releases = await getReleases();
  return releases;
};

async function getReleases() {
  var releases = null;

  col.getReleases("Rudebwoy1", 0, { page: 1, per_page: 1000 }, function(
    err,
    data
  ) {
    releases = data.releases;
  });

  return releases;
}

module.exports.getAllReleasesForUser = getAllReleasesForUser;
