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
    success: (data) => {
        $(data).each((i, country) => {
            $("#countrySelect").append(`<option value="${country.a2}" name="test">${country.nameCurrentValue}</option>`)
        })
    },
})


function favLoad() {
    var fav = getLocalStorage();
    var count = $(fav).length;
    console.log(count)

    $(fav).each((i, e) => {
        // var id;
        // if(e.type == "song") id= e.trackId;
        // if(e.type == "Album") id= e.trackId;
        $.ajax({
            url: "https://itunes.apple.com/lookup?id=" + e.trackId,
            dataType: "jsonp",
            success: (track) => {
                printResults(track.results[0], e.type, true);
            },
            complete: () => {
                if (i === count-1) {
                    // this will be executed at the end of the loop
                    $(".result").hover((e) => {
                        console.log("hover")
                        $(`#h${e.currentTarget.id}`).toggleClass("d-none");
                    });
                    heartFill();
                    $(".main__target__preview__btn").click(e => {
                        console.log("working");
                        return false;
                    })
                    heartClik();
                }
            }
        })
    })
}

favLoad();



// $("#searchBtn").click((e)=>{
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
                console.log("working");

                return false;
            })

            heartClik();
        }
    });
}

function printResults(result, type, fav) {
    // $("#main__container").empty();

    var contentType;
    type ? contentType = type : contentType = $("#fieldSelect").val();

    switch (contentType) {
        case "song":
            $(result).each((i, e) => {
                var n = new Date(e.releaseDate);
                if ($("#explicit").prop("checked") || fav) {
                    $("#main__container").append(createSong(e, month, n));
                    // $("#main__container").append(createSong(e, month, n));
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
                $(`#h${song.id}`).addClass("fillHeart");
                $(`#h${song.id} .st0`).css("fill", "red");
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
        console.log(i)
        if (song.trackId == element.trackId) {
            console.log(i + " index of same id")
            index = i;
        }
    });

    if (index > -1) {
        storage.splice(index, 1);
    };

    localStorage.setItem("favMusic", JSON.stringify(storage))
}