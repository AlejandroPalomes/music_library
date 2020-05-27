var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function createArtist(artist){

    $("#main__container").append(`
    <div id ="${artist.amgArtistId}" class="main__container__artist d-flex flex-column">
        <a href="${artist.artistLinkUrl}" class="main__container__artist--title mb-4 d-flex flex-column">
        <h3>${artist.artistName}</h3>
        <h5 class="mb-2">${artist.primaryGenreName}</h5>
        </a>
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
                    // console.log("****called each****");
                    var n = new Date(e.releaseDate);
                    if(i != 0) $(`#${artist.amgArtistId} .main__container__artist--songs`).append(createSong(e, month, n));
                })
            }else{
                $(`#${artist.amgArtistId}`).remove();
            }
        },
        complete: ()=> {
            $(".result").hover((e) => {
                $(`#h${e.currentTarget.id}`).toggleClass("d-none");
                $(`#v${e.currentTarget.id}`).toggleClass("d-none");
            });

            $(".main__target__video").click(function (a){
                $("#videoModalBtn").click();
                $("#audioPlayer").get(0).pause();
                $("#videoPreview").prop("src", $(`#${a.currentTarget.id}`).data("preview"));
                $("#videoPreview").get(0).play();
                return false;
            })

            heartFill();

            $(".main__target__preview__btn").click(e => {
                $("#audioPlayer").prop("src", $(e.currentTarget).data("preview"));
                document.querySelector("#audioPlayer").play();
                $("#pauseBtn").removeClass("d-none");
                $("#play").addClass("d-none");
                $('#display__title').text($(e.currentTarget).data("title"));
                $('#display__album').text($(e.currentTarget).data("album"));
                $('#display__artist').text($(e.currentTarget).data("artist"));
                $('#display__cover').prop("src", $(e.currentTarget).data("cover"));
                checkOverflow();
                return false;
            })

            heartClik();
        }
    });
    
}

// "use strict";

// var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// function createArtist(artist) {
//   // function createArtist(artistJSON){
//   // artist = JSON.parse(artistJSON)
//   // console.log(artist);
//   // console.log("createArtist called")
//   $("#main__container").append("\n    <div id =\"" + artist.amgArtistId + "\" class=\"main__container__artist d-flex flex-column\">\n        <a href=\"" + artist.artistLinkUrl + "\" class=\"main__container__artist--title mb-4 d-flex flex-column\">\n        <h3>" + artist.artistName + "</h3>\n        <h5 class=\"mb-2\">" + artist.primaryGenreName + "</h5>\n        </a>\n        <div class=\"main__container__artist--songs d-flex flex-wrap justify-content-between\">\n        </div>\n    </div>\n    ");
//   $.ajax({
//     url: "https://itunes.apple.com/lookup?amgArtistId=" + artist.amgArtistId + "&entity=song&limit=5&sort=recent",
//     success: function success(result) {
//       var data = JSON.parse(result).results;
//       $("#" + artist.amgArtistId + " .main__container__artist--songs").empty();

//       if (data.length) {
//         $(data).each(function (i, e) {
//           // console.log("****called each****");
//           var n = new Date(e.releaseDate);
//           if (i != 0) $("#" + artist.amgArtistId + " .main__container__artist--songs").append(createSong(e, month, n));
//         });
//       } else {
//         $("#" + artist.amgArtistId).remove();
//       }
//     },
//     complete: function complete() {
//       $(".result").hover(function (e) {
//         // console.log($(`#h${e.currentTarget.id}`))
//         $("#h" + e.currentTarget.id).toggleClass("d-none");
//       });
//       $(".main__target__preview__btn").click(function (e) {
//         $("#audioPlayer").prop("src", $(e.currentTarget).data("preview"));

//         if ($("#audioPlayer").data("paused") == true) {
//           document.querySelector("#audioPlayer").play();
//           $("#audioPlayer").data("paused", false);
//         } else {
//           document.querySelector("#audioPlayer").pause();
//           $("#audioPlayer").data("paused", true);
//         }

//         ;
//         return false;
//       });
//       heartFill();
//       heartClik();
//     }
//   });
// }