

"use strict";

var isIE = /*@cc_on!@*/false || !!document.documentMode;

if(isIE){
    $(".general").css("height", "100px");
    $(".main__controls__container").css("transform", "translateY(1px)")
}
var iTunesURI = "https://itunes.apple.com/search?";
var endpoint = "term=babymetal&limit=50&country=jp";
var countryValue;
var tempLocalStorage;
var objFav = {
    trackId: 0,
    type: ""
};
var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

$.ajax({
    url: "https://www.liferay.com/api/jsonws/country/get-countries/",
    success: function success(data) {
        $(data).each(function (i, country) {
            $("#countrySelect").append("<option value=\"" + country.a2 + "\" name=\"test\">" + country.nameCurrentValue + "</option>");
        });
    }
}); //volume control START

var e = document.querySelector('.volume-slider-con');
var eInner = document.querySelector('.volume-slider');
var audio = document.querySelector('audio');
var drag = false;
e.addEventListener('mousedown', function (ev) {
    drag = true;
    updateBar(ev.clientX);
});
document.addEventListener('mousemove', function (ev) {
    if (drag) {
        updateBar(ev.clientX);
    }
});
document.addEventListener('mouseup', function (ev) {
    drag = false;
});

var updateBar = function updateBar(x, vol) {
    var volume = e;
    var percentage; //if only volume have specificed
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
    } //update volume bar and video volume


    eInner.style.width = percentage + '%';
    audio.volume = percentage / 100;
}; //Volume control END

// Play/Pause button
$("#play__button").click(function (e) {
    if (document.querySelector("#audioPlayer").paused) {
        $("#play").addClass("d-none");
        $("#pauseBtn").removeClass("d-none");
        $("#audioPlayer").get(0).play();
    } else {
        $("#pauseBtn").addClass("d-none");
        $("#play").removeClass("d-none"); // document.querySelector("#audioPlayer").pause();

        $("#audioPlayer").get(0).pause();
    }
});

// Playing time bar
audio.addEventListener("timeupdate", function () {
    var currentTime = audio.currentTime;
    var duration = audio.duration;
    $('.hp_range').stop(true, true).animate({
        'width': (currentTime + .25) / duration * 100 + '%'
    }, 250, 'linear');

    if (currentTime >= 29.976960) {
        $('.hp_range').animate({
            "width": "0"
        }, 1, 'linear');
        $("#pauseBtn").addClass("d-none");
        $("#play").removeClass("d-none");
    }
});

//Stop video when closing modal
$("#videoModal").click(function (e) {
    if (e.target.id != "videoPreview") $("#videoPreview").get(0).pause();
});

// Load favorites at begginning
function favLoad() {
    var fav = getLocalStorage();
    $("#main__container").empty();
    $(fav).each(function (i, e) {
        $.ajax({
            url: "https://itunes.apple.com/lookup?id=" + e.trackId,
            dataType: "jsonp",
            success: function success(track) {
                printResults(track.results[0], e.type, true);
            },
            complete: function complete() {
                $("#p" + e.trackId).click(function (a) {
                    $("#audioPlayer").prop("src", $("#p" + e.trackId).data("preview"));
                    $("#audioPlayer").get(0).play();
                    $("#pauseBtn").removeClass("d-none");
                    $("#play").addClass("d-none");
                    $('#display__title').text($("#p" + e.trackId).data("title"));
                    $('#display__album').text($("#p" + e.trackId).data("album"));
                    $('#display__artist').text($("#p" + e.trackId).data("artist"));
                    $('#display__cover').prop("src", $("#p" + e.trackId).data("cover"));
                    checkOverflow();
                    return false;
                });
                $("#" + e.trackId).hover(function (a) {
                    $("#h" + a.currentTarget.id).toggleClass("d-none");
                    $("#v" + a.currentTarget.id).toggleClass("d-none");
                });
                $("#v" + e.trackId).click(function (a) {
                    $("#videoModalBtn").click();
                    $("#audioPlayer").get(0).pause();
                    $("#videoPreview").prop("src", $("#" + a.currentTarget.id).data("preview"));
                    $("#videoPreview").get(0).play();
                    return false;
                });
                $("#h" + e.trackId).addClass("fillHeart");
                $("#h" + e.trackId + " .st0").addClass("st0-2");
                $("#h" + e.trackId).click(function (a) {
                    $(a.currentTarget).toggleClass("fillHeart");
                    $("#" + a.currentTarget.id + " .st0").toggleClass("st0-2");
                    objFav.trackId = e.trackId;
                    objFav.type = e.type;
                    getLocalStorage();
                    saveLocalSorage(objFav);
                    // favLoad();

                    return false;
                });
            }
        });
    });
}

favLoad();

//Each time there's a change in the inputs, it updates the reuslts
$("#inputArtist").keyup(updateSearch);
$("#explicit").change(updateSearch);
$("#limitSelect").change(updateSearch);
$("#countrySelect").change(updateSearch);
$("#fieldSelect").change(updateSearch);

function updateSearch() {
    endpoint = "term=" + $("#inputArtist").prop("value");

    if ($("#fieldSelect").val() != null) {
        endpoint += "&entity=" + $("#fieldSelect option:selected").val();
    }

    if ($("#countrySelect option:selected").val() != null) {
        endpoint += "&country=" + $("#countrySelect option:selected").val();
    }

    if ($("#limitSelect option:selected").val() != null) {
        endpoint += "&limit=" + $("#limitSelect option:selected").val();
    }

    getResults(iTunesURI, endpoint);
}

//Request the results
function getResults(iTunesURI, endpoint) {
    $.ajax({
        url: iTunesURI,
        data: endpoint + "&lang=ja_jp",
        dataType: "jsonp",
        success: function success(result) {
            $("#main__container").empty();
            printResults(result.results);
        },
        error: function error() {
            return console.log("fuck");
        },
        complete: function complete() {
            $(".result").hover(function (e) {
                $("#h" + e.currentTarget.id).toggleClass("d-none");
                $("#v" + e.currentTarget.id).toggleClass("d-none");
            });
            $(".main__target__video").click(function (a) {
                $("#videoModalBtn").click();
                $("#audioPlayer").get(0).pause();
                $("#videoPreview").prop("src", $("#" + a.currentTarget.id).data("preview"));
                $("#videoPreview").get(0).play();
                return false;
            });
            heartFill();
            $(".main__target__preview__btn").click(function (e) {
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
            });
            heartClik();
        }
    });
}

//Print the results
function printResults(result, type, fav) {
    var contentType;
    type ? contentType = type : contentType = $("#fieldSelect").val();

    switch (contentType) {
        case "song":
            $(result).each(function (i, e) {
                var n = new Date(e.releaseDate);

                if ($("#explicit").prop("checked") || fav) {
                    $("#main__container").append(createSong(e, month, n));
                } else {
                    if (e.collectionExplicitness == "notExplicit") {
                        $("#main__container").append(createSong(e, month, n));
                    }
                }
            });
            break;

        case "album":
        case "Album":
            $(result).each(function (i, e) {
                var n = new Date(e.releaseDate);

                if ($("#explicit").prop("checked") || fav) {
                    $("#main__container").append(createAlbum(e, month, n));
                } else {
                    if (e.contentAdvisoryRating != "Explicit" || e.collectionExplicitness == "notExplicit") {
                        $("#main__container").append(createAlbum(e, month, n));
                    }
                }
            });
            break;

        case "allArtist":
            $(result).each(function (i, e) {
                if (e.wrapperType == "artist") {
                    createArtist(e);
                }
            });
            break;

        case "musicVideo":
        case "music-video":
            $(result).each(function (i, e) {
                var n = new Date(e.releaseDate);

                if ($("#explicit").prop("checked") || fav) {
                    $("#main__container").append(createVideo(e, month, n));
                } else {
                    if (e.collectionExplicitness == "notExplicit") {
                        $("#main__container").append(createVideo(e, month, n));
                    }
                }
            });
            break;

        default:
            $(result).each(function (i, e) {
                var n = new Date(e.releaseDate);
                if (e.kind == "song") $("#main__container").append(createSong(e, month, n));
                if (e.kind == "music-video") $("#main__container").append(createVideo(e, month, n));
                if (e.wrapperType == "collection") $("#main__container").append(createAlbum(e, month, n));
            });
    }
}

//When click on the heart
function heartClik() {
    $(".heart").click(function (e) {
        var trackIdCurrent = $(e.currentTarget).parent().parent().prop("id");
        var currentType = $(e.currentTarget).parent().parent().data("type");
        objFav.trackId = trackIdCurrent;
        objFav.type = currentType;
        $(e.currentTarget).toggleClass("fillHeart");
        $("#" + e.currentTarget.id + " .st0").toggleClass("st0-2");
        getLocalStorage();
        saveLocalSorage(objFav);
        return false;
    });
    heartFill();
}

//Fill the heart when it is in favorites
function heartFill() {
    var storage = getLocalStorage();
    $(".result").each(function (i, song) {
        $(storage).each(function (i, fav) {
            if (song.id == fav.trackId) {
                $("#h" + song.id).addClass("fillHeart");
                $("#h" + song.id + " .st0").addClass("st0-2");
            }
        });
    });
}

//Check localStorage
function checkStorage(song) {
    var trackIdCurrent = $(song).parent().parent().prop("id");
    var currentType = $(song).parent().parent().data("type");
    objFav.trackId = trackIdCurrent;
    objFav.type = currentType;
    getLocalStorage();
    saveLocalSorage(objFav);
    return false;
}

//Get localStorage
function getLocalStorage() {
    tempLocalStorage = JSON.parse(localStorage.getItem("favMusic"));
    return tempLocalStorage;
}

//Check before save to localStorage
function saveLocalSorage(obj1) {
    var storage = getLocalStorage();

    if (storage) {
        var include = storage.filter(function (fav) {
            return fav.trackId == obj1.trackId;
        });
        include.length ? removeSong(storage, obj1) : uploadStorage(storage, obj1);
    } else {
        var arr = [];
        arr.push(obj1);
        localStorage.setItem("favMusic", JSON.stringify(arr));
        return;
    }
}

//add to localStorage
function uploadStorage(storage, obj1) {
    storage.push(obj1);
    localStorage.setItem("favMusic", JSON.stringify(storage)); // return false;
}

//Remove from localStorage
function removeSong(storage, element) {
    var index;
    $(storage).each(function (i, song) {
        if (song.trackId == element.trackId) {
            index = i;
        }
    });

    if (index > -1) {
        storage.splice(index, 1);
    }

    ;
    localStorage.setItem("favMusic", JSON.stringify(storage));
}

//Check if the artist+album overflows in the media player
function checkOverflow() {
    if ($('.main__controls__display--artist')[0].scrollWidth > $('.main__controls__display--artist').innerWidth()) {
        //Text has over-flown
        $('#artistInfo').css("position", "absolute");
        var displace = $('.main__controls__display--artist')[0].scrollWidth - $('.main__controls__display--artist').innerWidth();
        $('#artistInfo').css("left", "10px");
        $('#artistInfo').finish();
        $('#artistInfo').animate({
            left: "-" + (displace + 10) + "px"
        }, 8000, "swing").animate({
            left: "10px"
        }, 8000, "swing");
    } else {
        $('#artistInfo').finish();
        $('#artistInfo').css("position", "relative");
    }
}