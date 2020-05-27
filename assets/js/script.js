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
                    if($("#audioPlayer").data("paused")==true){
                        document.querySelector("#audioPlayer").play();
                        $("#audioPlayer").data("paused", false);
                    }else{
                        document.querySelector("#audioPlayer").pause();
                        $("#audioPlayer").data("paused", true);
                    };
                    $('#toggleControls').click();
                    $('#toggleControls').text();

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
                if($("#audioPlayer").data("paused")==true){
                    document.querySelector("#audioPlayer").play();
                    $("#audioPlayer").data("paused", false);
                }else{
                    document.querySelector("#audioPlayer").pause();
                    $("#audioPlayer").data("paused", true);
                };
                $('#toggleControls').click();
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