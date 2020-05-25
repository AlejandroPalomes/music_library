var iTunesURI = "https://itunes.apple.com/search?";
var endpoint = "term=babymetal&limit=50&country=jp";
var countryValue;


$.ajax({
    url: "https://www.liferay.com/api/jsonws/country/get-countries/",
    success: (data)=> {
        $(data).each((i, country)=>{
            $("#countrySelect").append(`<option value="${country.a2}" name="test">${country.nameCurrentValue}</option>`)
        })
        // console.log(data)
    },
    // async: false,
})

// $("#searchBtn").click((e)=>{
$("#inputArtist").keyup((e)=>{
    endpoint = `term=${$("#inputArtist").prop("value")}`;
    
    if($("#fieldSelect").val() != ""){
        endpoint += `&entity=${$("#fieldSelect option:selected").val()}`
    }

    if($("#countrySelect option:selected").val() != ""){
        endpoint += `&country=${$("#countrySelect option:selected").val()}`
    }
    if($("#limitSelect option:selected").val() != ""){
        endpoint += `&limit=${$("#limitSelect option:selected").val()}`
    }
    // console.log($("#countrySelect option:selected").val())
    console.log(endpoint);

    getResults(iTunesURI, endpoint);
    
})
// )

function getResults(iTunesURI, endpoint){
    $.ajax({
        url : iTunesURI,
        data: endpoint + "&lang=ja_jp",
        method: "GET",
        dataType: "jsonp",
        success: (result)=> {
            logResults(result.results)
            printResults(result.results)
        },
        error: ()=> console.log("fuck"),
    });
}


// getResults(iTunesURI, endpoint);

function printResults(result, type){
    if($(".result").length) $(".result").remove()
    if($("#fieldSelect").val() == "song"){
        $(result).each((i, e)=>{
            if($("#explicit").prop("checked")){
                $("#main__container").append(`<div class="main__target mx-3 mb-4 d-flex flex-column result">
                                                <div class="main__target__img">
                                                    <img src="${e.artworkUrl100}" alt="art img">
                                                </div>
                                                <div class=" main__target__info d-flex flex-column justify-content-between">
                                                    <div class="mt-2 px-2 d-flex flex-column justify-content-between">
                                                        <h4 class="main__target__title">${e.collectionName}</h4>
                                                        <h5 class="main__target__artist">${e.artistName}</h5>
                                                        <h6 class="main__artist__album">${e.collectionName}</h6>
                                                    </div>
                                                    <div class="px-2 d-flex justify-content-between">
                                                        <span>${e.releaseDate}</span>
                                                        <a href="http://"><span>${e.trackPrice}</span></a>
                                                    </div>
                                                    <span class="px-2">${e.primaryGenreName}</span>
                                                    <div class="px-2">
                                                        <button>Play</button>
                                                        <span>${e.trackTimeMillis}</span>
                                                    </div>
                                                </div>
                                            </div>`
            );
            }else{
                if(e.collectionExplicitness == "notExplicit"){
                    $("#main__container").append(`<img class="result" src=${e.artworkUrl100}>`);
                }
            }
        })
    }else if($("#fieldSelect").val() == "album"){
        $(result).each((i, e)=>{
            if($("#explicit").prop("checked")){
                $("#main__container").append(`<img class="result" src=${e.artworkUrl100}>`);
            }else{
                if(e.collectionExplicitness == "notExplicit"){
                    $("#main__container").append(`<img class="result" src=${e.artworkUrl60}>`);
                }
            }
        })
    }else if($("#fieldSelect").val() == "allArtist"){
        console.log("i'm in artist");
        $(result).each((i, e)=>{
            $.ajax({
                url: `https://itunes.apple.com/lookup?amgArtistId=${e.amgArtistId}`,
                success: (result)=> console.log(JSON.parse(result).results),
                error: ()=> console.log("fuck on id")
            });

            })
        }
    
}

function logResults(result){
    console.log(result)
}