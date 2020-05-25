var iTunesURI = "https://itunes.apple.com/search?";
var endpoint = "term=babymetal&limit=50&country=jp";
var countryValue;
var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


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
    //poner todo esto dentro de una funcion, y añadir más listeners de cambios de estado del check, o de las categories, y que cuando
    //suceda, se ejecute esta misma función
    endpoint = `term=${$("#inputArtist").prop("value")}`;
    
    if($("#fieldSelect").val() != null){
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
        // method: "GET",
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
    $("#main__container").empty();
    if($("#fieldSelect").val() == "song"){
        $(result).each((i, e)=>{
            if($("#explicit").prop("checked")){
                var n = new Date(e.releaseDate);
                $("#main__container").append(`
                <a href="${e.collectionViewUrl}" class="result">
                    <div class="main__target mx-3 mb-4 d-flex flex-column">
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
                                <span>${month[n.getMonth()]} ${n.getFullYear()}</span>
                                <span>${e.trackPrice}</span>
                            </div>
                            <span class="px-2">${e.primaryGenreName}</span>
                            <div class="px-2">
                                <button>Play</button>
                                <span>${e.trackTimeMillis}</span>
                            </div>
                        </div>
                    </div>
                </a>`
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