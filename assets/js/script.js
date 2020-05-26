var iTunesURI = "https://itunes.apple.com/search?";
var endpoint = "term=babymetal&limit=50&country=jp";
var countryValue;
var tempLocalStorage;
var objFav = {
    test:"hola",
}
var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


$.ajax({
    url: "https://www.liferay.com/api/jsonws/country/get-countries/",
    success: (data) => {
        $(data).each((i, country) => {
            $("#countrySelect").append(`<option value="${country.a2}" name="test">${country.nameCurrentValue}</option>`)
        })
        // console.log(data)
    },
    // async: false,
})

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

    if ($("#countrySelect option:selected").val() != "") {
        endpoint += `&country=${$("#countrySelect option:selected").val()}`
    }
    if ($("#limitSelect option:selected").val() != "") {
        endpoint += `&limit=${$("#limitSelect option:selected").val()}`
    }

    // console.log($("#countrySelect option:selected").val())
    console.log(endpoint);

    getResults(iTunesURI, endpoint);
}
// )

function getResults(iTunesURI, endpoint) {
    $.ajax({
        url: iTunesURI,
        data: endpoint + "&lang=ja_jp",
        // method: "GET",
        dataType: "jsonp",
        success: (result) => {
            logResults(result.results)
            printResults(result.results)
        },
        error: () => console.log("fuck"),
        complete: () => {
            console.log("completed")
            $(".result").hover((e) => {
                console.log(e.currentTarget);
                $(`#h${e.currentTarget.id}`).toggleClass("d-none");
            });
            $(".main__target__preview__btn").click(e =>{
                console.log("working");
                getLocalStorage()
                saveLocalSorage(objFav)
                
                return false;
            })
            $(".heart").click(e =>{
                // console.log("working")
                
                return false;
            })
        }
    });
}

$(".result").hover((e) => {
    // console.log(e.currentTarget);
    // console.log(e.target);
    $(`#h${e.currentTarget.id}`).toggleClass("d-none");
});
$(".main__target__preview__btn").click(e =>{
    console.log("working");
    return false;
})
$(".heart").click(e =>{
    console.log("working")
    return false;
})

// getResults(iTunesURI, endpoint);

function printResults(result, type) {
    $("#main__container").empty();
    if ($("#fieldSelect").val() == "song") {
        $(result).each((i, e) => {
            if ($("#explicit").prop("checked")) {
                var n = new Date(e.releaseDate);
                $("#main__container").append(createSong(e, month, n));
                // $("#main__container").append(createSong(e, month, n));
            } else {
                if (e.collectionExplicitness == "notExplicit") {
                    $("#main__container").append(`<img class="result" src=${e.artworkUrl100}>`);
                }
            }
        })
    } else if ($("#fieldSelect").val() == "album") {
        $(result).each((i, e) => {
            if ($("#explicit").prop("checked")) {
                $("#main__container").append(`<img class="result" src=${e.artworkUrl100}>`);
            } else {
                if (e.collectionExplicitness == "notExplicit") {
                    $("#main__container").append(`<img class="result" src=${e.artworkUrl60}>`);
                }
            }
        })
    } else if ($("#fieldSelect").val() == "allArtist") {
        console.log("i'm in artist");
        $(result).each((i, e) => {
            $.ajax({
                url: `https://itunes.apple.com/lookup?amgArtistId=${e.amgArtistId}`,
                success: (result) => console.log(JSON.parse(result).results),
                error: () => console.log("fuck on id")
            });
        })
    }
}

function logResults(result) {
    console.log(result)
}

function getLocalStorage() {
    tempLocalStorage = JSON.parse(localStorage.getItem("favMusic"))
    return tempLocalStorage;
}

function saveLocalSorage(obj1) {
    let storage = getLocalStorage()
    if (storage) {
        storage.push(obj1)
    } else {
        let arr = []
        arr.push(obj1)
        localStorage.setItem("favMusic", JSON.stringify(arr))
    }
    
    localStorage.setItem("favMusic", JSON.stringify(storage))

}