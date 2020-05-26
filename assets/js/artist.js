
function createArtist(artist){
// function createArtist(artistJSON){
    // artist = JSON.parse(artistJSON)
    //console.log(artist.amgArtistId);
    $("#main__container").append(`
    <div id ="${artist.amgArtistId}" class="main__container__artist">
        <h3>${artist.artistName}</h3>
        <div class="main__container__artist--songs">
        </div>
    </div>
    `);
    $.ajax({
        url: `https://itunes.apple.com/lookup?amgArtistId=${artist.amgArtistId}&entity=song&limit=5&sort=recent`,
        success: (result)=> console.log(JSON.parse(result).results)//$(`#${artist.amgArtistId}`).append(createSong(result.results))
    });
    
}