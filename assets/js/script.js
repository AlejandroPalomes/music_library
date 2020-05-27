var iTunesURI = "https://itunes.apple.com/search?";
var endpoint = "term=babymetal&limit=50&country=jp";
var countryValue;
var tempLocalStorage;
var objFav = {
    trackId: 0,
    type: ""
}
var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

$.ajax({
    url: "https://www.liferay.com/api/jsonws/country/get-countries/",
    success: (data)=>{
        $(data).each((i, country) => {
            $("#countrySelect").append(`<option value="${country.a2}" name="test">${country.nameCurrentValue}</option>`)
        })
    },
})


//volume control START

var e = document.querySelector('.volume-slider-con');
var eInner = document.querySelector('.volume-slider');
var audio = document.querySelector('audio');
var drag = false;
e.addEventListener('mousedown',function(ev){
   drag = true;
   updateBar(ev.clientX);
});
document.addEventListener('mousemove',function(ev){
   if(drag){
      updateBar(ev.clientX);
   }
});
document.addEventListener('mouseup',function(ev){
 drag = false;
});
var updateBar = function (x, vol) {
   var volume = e;
        var percentage;
        //if only volume have specificed
        //then direct update volume
        if (vol) {
            percentage = vol * 100;
        } else {
            var position = x - volume.offsetLeft;
            percentage = 100 * position / volume.clientWidth;
        }

        if (percentage > 100) {
            percentage = 100;
        }
        if (percentage < 0) {
            percentage = 0;
        }

        //update volume bar and video volume
        eInner.style.width = percentage +'%';
        audio.volume = percentage / 100;
};

$("#play__button").click(function(e){
    if(document.querySelector("#audioPlayer").paused){
        $("#play").addClass("d-none");
        $("#pauseBtn").removeClass("d-none");
        document.querySelector("#audioPlayer").play();
    } else{
        $("#pauseBtn").addClass("d-none");
        $("#play").removeClass("d-none");
        document.querySelector("#audioPlayer").pause();
    }
    console.log("working");
})

// var player = document.getElementById('player');
audio.addEventListener("timeupdate", function() {
    var currentTime = audio.currentTime;
    var duration = audio.duration;
    $('.hp_range').stop(true,true).animate({'width':(currentTime +.25)/duration*100+'%'},250,'linear');
    console.log(currentTime)
    if(currentTime >= 29.976960){
        console.log("it worked bitch")
        $('.hp_range').animate({"width": "0"}, 1, 'linear');
        $("#pauseBtn").addClass("d-none");
        $("#play").removeClass("d-none");
    }
});

// volume control END

function favLoad() {
    var fav = getLocalStorage();
    $("#main__container").empty();
    $(fav).each((i, e) => {
        $.ajax({
            url: "https://itunes.apple.com/lookup?id=" + e.trackId,
            dataType: "jsonp",
            success: (track) => {

                printResults(track.results[0], e.type, true);

            },
            complete: () => {
                $(`#p${e.trackId}`).click(a => {
                    $("#audioPlayer").prop("src", $(`#p${e.trackId}`).data("preview"))
                    document.querySelector("#audioPlayer").play();
                    // if($("#audioPlayer").data("paused")==true){
                    //     document.querySelector("#audioPlayer").play();
                    //     $("#audioPlayer").data("paused", false);
                    // }else{
                    //     document.querySelector("#audioPlayer").pause();
                    //     $("#audioPlayer").data("paused", true);
                    // };
                    $("#pauseBtn").removeClass("d-none");
                    $("#play").addClass("d-none");
                    $('#display__title').text($(`#p${e.trackId}`).data("title"));
                    $('#display__album').text($(`#p${e.trackId}`).data("album"));
                    $('#display__artist').text($(`#p${e.trackId}`).data("artist"));
                    $('#display__cover').prop("src", $(`#p${e.trackId}`).data("cover"));

                    return false;

                })

                $(`#${e.trackId}`).hover((a) => {
                    $(`#h${a.currentTarget.id}`).toggleClass("d-none");
                });

                $(`#h${e.trackId}`).addClass("fillHeart");
                $(`#h${e.trackId} .st0`).addClass("st0-2");

                $(`#h${e.trackId}`).click(a => {
                    $(a.currentTarget).toggleClass("fillHeart");
                    $(`#${a.currentTarget.id} .st0`).toggleClass("st0-2");

                    objFav.trackId = e.trackId;
                    objFav.type = e.type;
                    getLocalStorage();
                    saveLocalSorage(objFav);
                    // favLoad();

                    return false;
                })
            }
        })
    })
}

favLoad();

$("#inputArtist").keyup(updateSearch);
$("#explicit").change(updateSearch);
$("#limitSelect").change(updateSearch);
$("#countrySelect").change(updateSearch);
$("#fieldSelect").change(updateSearch);

function updateSearch() {
    endpoint = `term=${$("#inputArtist").prop("value")}`;

    if ($("#fieldSelect").val() != null) {
        endpoint += `&entity=${$("#fieldSelect option:selected").val()}`
    }

    if ($("#countrySelect option:selected").val() != null) {
        endpoint += `&country=${$("#countrySelect option:selected").val()}`
    }
    if ($("#limitSelect option:selected").val() != null) {
        endpoint += `&limit=${$("#limitSelect option:selected").val()}`
    }

    getResults(iTunesURI, endpoint);
}
// )

function getResults(iTunesURI, endpoint) {
    $.ajax({
        url: iTunesURI,
        data: endpoint + "&lang=ja_jp",
        dataType: "jsonp",
        success: (result) => {
            //logResults(result.results)
            $("#main__container").empty();
            printResults(result.results);
        },
        error: () => console.log("fuck"),
        complete: () => {

            $(".result").hover((e) => {
                $(`#h${e.currentTarget.id}`).toggleClass("d-none");
            });

            heartFill();

            $(".main__target__preview__btn").click(e => {
                $("#audioPlayer").prop("src", $(e.currentTarget).data("preview"));
                document.querySelector("#audioPlayer").play();
                // if($("#audioPlayer").data("paused")==true){
                //     document.querySelector("#audioPlayer").play();
                //     $("#audioPlayer").data("paused", false);
                // }else{
                //     document.querySelector("#audioPlayer").pause();
                //     $("#audioPlayer").data("paused", true);
                // };
                $("#pauseBtn").removeClass("d-none");
                $("#play").addClass("d-none");
                $('#display__title').text($(e.currentTarget).data("title"));
                $('#display__album').text($(e.currentTarget).data("album"));
                $('#display__artist').text($(e.currentTarget).data("artist"));
                $('#display__cover').prop("src", $(e.currentTarget).data("cover"));
                return false;
            })

            heartClik();
        }
    });
}

function printResults(result, type, fav) {

    var contentType;
    type ? contentType = type : contentType = $("#fieldSelect").val();

    switch (contentType) {
        case "song":
            $(result).each((i, e) => {
                var n = new Date(e.releaseDate);
                if ($("#explicit").prop("checked") || fav) {
                    $("#main__container").append(createSong(e, month, n));
                } else {
                    if (e.collectionExplicitness == "notExplicit") {
                        $("#main__container").append(createSong(e, month, n));
                    }
                }
            })
            break;

        case "album":
        case "Album":
            $(result).each((i, e) => {
                var n = new Date(e.releaseDate);
                if ($("#explicit").prop("checked") || fav) {
                    $("#main__container").append(createAlbum(e, month, n));
                } else {
                    if (e.contentAdvisoryRating != "Explicit" || e.collectionExplicitness == "notExplicit") {
                        $("#main__container").append(createAlbum(e, month, n));
                    }
                }
            })
            break;

        case "allArtist":
            $(result).each((i, e) => {
                if(e.wrapperType == "artist"){
                    createArtist(e);
                }
            })
            break;

        default:
            $(result).each((i, e) => {
                // if ($("#explicit").prop("checked")) {
                var n = new Date(e.releaseDate);
                $("#main__container").append(createSong(e, month, n));
                // $("#main__container").append(createSong(e, month, n));
                // }
            })
    }
}

function logResults(result) {
    console.log(result)
}

function heartClik(){
    $(".heart").click(e => {
        // console.log($(e.currentTarget).parent().parent().prop("id"))
        let trackIdCurrent = $(e.currentTarget).parent().parent().prop("id");
        let currentType = $(e.currentTarget).parent().parent().data("type");

        objFav.trackId = trackIdCurrent;
        objFav.type = currentType;

        $(e.currentTarget).toggleClass("fillHeart");
        $(`#${e.currentTarget.id} .st0`).toggleClass("st0-2");

        getLocalStorage();
        saveLocalSorage(objFav);
        return false;
    })
    heartFill()
}

function heartFill(){
    var storage = getLocalStorage();
    $(".result").each((i, song)=>{
        $(storage).each((i, fav)=>{
            if(song.id == fav.trackId){
                console.log("i'm in fucking fav bitch")
                $(`#h${song.id}`).addClass("fillHeart");
                $(`#h${song.id} .st0`).addClass("st0-2");
            }
        })
    })
}

function  checkStorage(song){
    let trackIdCurrent = $(song).parent().parent().prop("id");
    let currentType = $(song).parent().parent().data("type");
    objFav.trackId = trackIdCurrent;
    objFav.type = currentType;
    getLocalStorage();
    saveLocalSorage(objFav);
    return false;
}

function getLocalStorage() {
    tempLocalStorage = JSON.parse(localStorage.getItem("favMusic"))
    return tempLocalStorage;
}

function saveLocalSorage(obj1) {
    let storage = getLocalStorage()
    if (storage){
        var include = storage.filter(fav => fav.trackId == obj1.trackId)
        include.length ? removeSong(storage, obj1) : uploadStorage(storage, obj1);
    } else {
        let arr = []
        arr.push(obj1)
        localStorage.setItem("favMusic", JSON.stringify(arr))
        return
    }
}

function uploadStorage(storage, obj1){
    storage.push(obj1);
    localStorage.setItem("favMusic", JSON.stringify(storage));
    // return false;
}

function removeSong(storage, element) {
    let index;
    $(storage).each((i, song) => {
        if (song.trackId == element.trackId) {
            index = i;
        }
    });

    if (index > -1) {
        storage.splice(index, 1);
    };

    localStorage.setItem("favMusic", JSON.stringify(storage))
}

// "use strict";

// var iTunesURI = "https://itunes.apple.com/search?";
// var endpoint = "term=babymetal&limit=50&country=jp";
// var countryValue;
// var tempLocalStorage;
// var objFav = {
//   trackId: 0,
//   type: ""
// };
// var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// $.ajax({
//   url: "https://www.liferay.com/api/jsonws/country/get-countries/",
//   success: function success(data) {
//     $(data).each(function (i, country) {
//       $("#countrySelect").append("<option value=\"" + country.a2 + "\" name=\"test\">" + country.nameCurrentValue + "</option>");
//     });
//   }
// });

// function favLoad() {
//   var fav = getLocalStorage();
//   $("#main__container").empty();
//   $(fav).each(function (i, e) {
//     $.ajax({
//       url: "https://itunes.apple.com/lookup?id=" + e.trackId,
//       dataType: "jsonp",
//       success: function success(track) {
//         printResults(track.results[0], e.type, true);
//       },
//       complete: function complete() {
//         $("#p" + e.trackId).click(function (a) {
//           $("#audioPlayer").prop("src", $("#p" + e.trackId).data("preview"));

//           if ($("#audioPlayer").data("paused") == true) {
//             document.querySelector("#audioPlayer").play();
//             $("#audioPlayer").data("paused", false);
//           } else {
//             document.querySelector("#audioPlayer").pause();
//             $("#audioPlayer").data("paused", true);
//           }

//           ;
//           return false;
//         });
//         $("#" + e.trackId).hover(function (a) {
//           $("#h" + a.currentTarget.id).toggleClass("d-none");
//         });
//         $("#h" + e.trackId).addClass("fillHeart");
//         $("#h" + e.trackId + " .st0").addClass("st0-2");
//         $("#h" + e.trackId).click(function (a) {
//           $(a.currentTarget).toggleClass("fillHeart");
//           $("#" + a.currentTarget.id + " .st0").toggleClass("st0-2");
//           objFav.trackId = e.trackId;
//           objFav.type = e.type;
//           getLocalStorage();
//           saveLocalSorage(objFav); // favLoad();

//           return false;
//         });
//       }
//     });
//   });
// }

// favLoad();
// $("#inputArtist").keyup(updateSearch);
// $("#explicit").change(updateSearch);
// $("#limitSelect").change(updateSearch);
// $("#countrySelect").change(updateSearch);
// $("#fieldSelect").change(updateSearch);

// function updateSearch() {
//   endpoint = "term=" + $("#inputArtist").prop("value");

//   if ($("#fieldSelect").val() != null) {
//     endpoint += "&entity=" + $("#fieldSelect option:selected").val();
//   }

//   if ($("#countrySelect option:selected").val() != null) {
//     endpoint += "&country=" + $("#countrySelect option:selected").val();
//   }

//   if ($("#limitSelect option:selected").val() != null) {
//     endpoint += "&limit=" + $("#limitSelect option:selected").val();
//   }

//   getResults(iTunesURI, endpoint);
// } // )


// function getResults(iTunesURI, endpoint) {
//   $.ajax({
//     url: iTunesURI,
//     data: endpoint + "&lang=ja_jp",
//     dataType: "jsonp",
//     success: function success(result) {
//       //logResults(result.results)
//       $("#main__container").empty();
//       printResults(result.results);
//     },
//     error: function error() {
//       return console.log("fuck");
//     },
//     complete: function complete() {
//       $(".result").hover(function (e) {
//         $("#h" + e.currentTarget.id).toggleClass("d-none");
//       });
//       heartFill();
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
//       heartClik();
//     }
//   });
// }

// function printResults(result, type, fav) {
//   var contentType;
//   type ? contentType = type : contentType = $("#fieldSelect").val();

//   switch (contentType) {
//     case "song":
//       $(result).each(function (i, e) {
//         var n = new Date(e.releaseDate);

//         if ($("#explicit").prop("checked") || fav) {
//           $("#main__container").append(createSong(e, month, n));
//         } else {
//           if (e.collectionExplicitness == "notExplicit") {
//             $("#main__container").append(createSong(e, month, n));
//           }
//         }
//       });
//       break;

//     case "album":
//     case "Album":
//       $(result).each(function (i, e) {
//         var n = new Date(e.releaseDate);

//         if ($("#explicit").prop("checked") || fav) {
//           $("#main__container").append(createAlbum(e, month, n));
//         } else {
//           if (e.contentAdvisoryRating != "Explicit" || e.collectionExplicitness == "notExplicit") {
//             $("#main__container").append(createAlbum(e, month, n));
//           }
//         }
//       });
//       break;

//     case "allArtist":
//       $(result).each(function (i, e) {
//         if (e.wrapperType == "artist") {
//           createArtist(e);
//         }
//       });
//       break;

//     default:
//       $(result).each(function (i, e) {
//         // if ($("#explicit").prop("checked")) {
//         var n = new Date(e.releaseDate);
//         $("#main__container").append(createSong(e, month, n)); // $("#main__container").append(createSong(e, month, n));
//         // }
//       });
//   }
// }

// function logResults(result) {
//   console.log(result);
// }

// function heartClik() {
//   $(".heart").click(function (e) {
//     // console.log($(e.currentTarget).parent().parent().prop("id"))
//     var trackIdCurrent = $(e.currentTarget).parent().parent().prop("id");
//     var currentType = $(e.currentTarget).parent().parent().data("type");
//     objFav.trackId = trackIdCurrent;
//     objFav.type = currentType;
//     $(e.currentTarget).toggleClass("fillHeart");
//     $("#" + e.currentTarget.id + " .st0").toggleClass("st0-2");
//     getLocalStorage();
//     saveLocalSorage(objFav);
//     return false;
//   });
//   heartFill();
// }

// function heartFill() {
//   var storage = getLocalStorage();
//   $(".result").each(function (i, song) {
//     $(storage).each(function (i, fav) {
//       if (song.id == fav.trackId) {
//         console.log("i'm in fucking fav bitch");
//         $("#h" + song.id).addClass("fillHeart");
//         $("#h" + song.id + " .st0").addClass("st0-2");
//       }
//     });
//   });
// }

// function checkStorage(song) {
//   var trackIdCurrent = $(song).parent().parent().prop("id");
//   var currentType = $(song).parent().parent().data("type");
//   objFav.trackId = trackIdCurrent;
//   objFav.type = currentType;
//   getLocalStorage();
//   saveLocalSorage(objFav);
//   return false;
// }

// function getLocalStorage() {
//   tempLocalStorage = JSON.parse(localStorage.getItem("favMusic"));
//   return tempLocalStorage;
// }

// function saveLocalSorage(obj1) {
//   var storage = getLocalStorage();

//   if (storage) {
//     var include = storage.filter(function (fav) {
//       return fav.trackId == obj1.trackId;
//     });
//     include.length ? removeSong(storage, obj1) : uploadStorage(storage, obj1);
//   } else {
//     var arr = [];
//     arr.push(obj1);
//     localStorage.setItem("favMusic", JSON.stringify(arr));
//     return;
//   }
// }

// function uploadStorage(storage, obj1) {
//   storage.push(obj1);
//   localStorage.setItem("favMusic", JSON.stringify(storage)); // return false;
// }

// function removeSong(storage, element) {
//   var index;
//   $(storage).each(function (i, song) {
//     if (song.trackId == element.trackId) {
//       index = i;
//     }
//   });

//   if (index > -1) {
//     storage.splice(index, 1);
//   }

//   ;
//   localStorage.setItem("favMusic", JSON.stringify(storage));
// }