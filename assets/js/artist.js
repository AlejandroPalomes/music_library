var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];



function createArtist(artist){
// function createArtist(artistJSON){
    // artist = JSON.parse(artistJSON)
    //console.log(artist.amgArtistId);
    $("#main__container").append(`
    <div id ="${artist.amgArtistId}" class="main__container__artist">
        <h3>${artist.artistName}</h3>
        <div class="main__container__artist--songs d-flex flex-wrap justify-content-between">
        </div>
    </div>
    `);
    $.ajax({
        url: `https://itunes.apple.com/lookup?amgArtistId=${artist.amgArtistId}&entity=song&limit=5&sort=recent`,
        success: (result)=> {
            var data = (JSON.parse(result).results)
            $(data).each((i,e)=>{
                var n = new Date(e.releaseDate);
                if(i != 0) $(`#${artist.amgArtistId} .main__container__artist--songs`).append(createSong(e, month, n))
            })
        }
    });
    
}