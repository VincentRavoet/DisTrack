$(document).ready(function () {
    $('#truncateBtn').on('click', () => {
        sendAjax("/migrate");
    });

    $('#lastfmBtn').on('click', () => {
        sendAjax("/lastfm");
    });

    $('#updateReleasesBtn').on('click', () => {
        sendAjax("/updateReleaseForAllArtists");
    });

    $("#discogs-username").focus(function () {
        $('#bgVideo').fadeTo('fast', 0.2);
    });

    $("#discogs-username").focusout(function () {
        $('#bgVideo').fadeTo('fast', 0.5);
    });

    $('#storeArtistsForUsername').on('click', () => {
        var usernameJson = $("#getArtistsForUsername").serializeArray().reduce((m, o) => { m[o.name] = o.value; return m; }, {});
        sendAjax("/createArtistsForUsername/" + usernameJson.username);
    });

    $('#getArtistsForUsername').on('submit', (e) => {
        e.preventDefault();

        $('#discogs-username').focusout();

        var usernameJson = $("#getArtistsForUsername").serializeArray().reduce((m, o) => { m[o.name] = o.value; return m; }, {})

        $.ajax({
            url: '/getArtistsForUsername/' + usernameJson.username
        }).done((data) => {
            data = sortByName(data);

            data.forEach((artist) => {
                $.ajax({
                    url: '/getRecentReleaseForArtist/' + artist.DISCOGS_ARTIST_ID
                }).done((release) => {
                    $('#distrack_list').append('<div class="artist-card-container col-sm-4"><div class="artist-card"><img class="artist-card-image" src="' + artist.picture_url + '"/><div class="row artist-card-info"><div class="release-cover col-sm-4"><img class="release-cover-image" src="' + release[0].picture_url + '" /></div><div class="artist-info col-sm-8"><div class="artist-name">' + artist.name + '</div><div class="artist-release">' + release[0].title + '</div></div></div></div></div>');
                })
            })
        })


    });

    sendAjax = (url) => {
        $.ajax({
            url: url
        }).done(function (data) {
            console.log(data);
        });
    }

    sortByName = (data) => {
        data.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });

        return data;
    }

});