var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function createArtist(artist){
// function createArtist(artistJSON){
    // artist = JSON.parse(artistJSON)
    console.log(artist);
    console.log("createArtist called")
    $("#main__container").append(`
    <div id ="${artist.amgArtistId}" class="main__container__artist d-flex flex-column">
        <a href="${artist.artistLinkUrl}" class="main__container__artist--title mb-3"><h3>${artist.artistName}</h3></a>
        <div class="main__container__artist--songs d-flex flex-wrap justify-content-between">
        </div>
    </div>
    `);
    $.ajax({
        url: `https://itunes.apple.com/lookup?amgArtistId=${artist.amgArtistId}&entity=song&limit=5&sort=recent`,
        success: (result)=> {
            var data = (JSON.parse(result).results)
            $(`#${artist.amgArtistId} .main__container__artist--songs`).empty()
            if(data.length){
                $(data).each((i,e)=>{
                    console.log("****called each****");
                    var n = new Date(e.releaseDate);
                    if(i != 0) $(`#${artist.amgArtistId} .main__container__artist--songs`).append(createSong(e, month, n));
                })
            }else{
                $(`#${artist.amgArtistId}`).remove();
            }
        },
        complete: ()=> {
            $(".result").hover((e) => {
                // console.log($(`#h${e.currentTarget.id}`))
                $(`#h${e.currentTarget.id}`).toggleClass("d-none");
            });

            heartClik();
        }
    });
    
}