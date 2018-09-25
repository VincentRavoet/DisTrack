$(document).ready(() => {
    $('#artist-search').keyup((e) => {
        const key = e.key;
        const artistInput = $('#artist-search').val();
        if (artistInput.length > 2) {
            searchForArtist(artistInput);
        }
    })
});

searchForArtist = (artist) => {
    let url = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + artist + '&api_key=3d80c6e4dcdfbf7849574d4bfe167e1a&format=json';
    $.ajax({
        url: url
    }).done(function (data) {
        $('.result-div').empty();
        const artist = data.artist;

        let imageURL = artist.image[3]['#text'] ? artist.image[3]['#text'] : 'https://mbtskoudsalg.com/images/black-cd-png-8.png';

        $('#artist-search-image').append('<img style="width:100%" src="' + imageURL + '"/>');
        $('#artist-search-name').append(artist.name);

    });
}