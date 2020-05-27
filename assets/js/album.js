function createAlbum(e, month, date){
    // var time = e.trackTimeMillis/1000
    // var minutes;
    // var seconds;

    // (time/60)<1 ? minutes = "00" : minutes = (Math.floor(time/60));
    // (time)>60 ? seconds = Math.floor(time)-(60*Math.floor((time/60))) : seconds = Math.floor(time/60);
    // seconds.toString().length == 1 ? seconds = "0" + seconds : seconds;

    return `
        <a href="${e.collectionViewUrl}" class="result" id="${e.collectionId}"  data-type="${e.collectionType}">
                <div class="main__target mx-3 mb-4 d-flex flex-column">
                    <div class="main__target__img">
                        <img src="${e.artworkUrl100}" alt="art img">
                    </div>
                    <div class=" main__target__info d-flex flex-column justify-content-between">
                        <div class="mt-2 px-3 d-flex flex-column justify-content-between">
                            <h4 class="main__target__title">${truncate(e.collectionName, 30, true)}</h4>
                            <h5 class="main__target__artist">${e.artistName}</h5>
                            <h6 class="main__target__album">${truncate(e.collectionName, 30, true)}</h6>
                        </div>
                        <div class="px-3 d-flex justify-content-between smallText">
                            <span>${month[date.getMonth()]} ${date.getFullYear()}</span>
                            <span><span>${e.collectionPrice}</span><span> ${e.currency}</span></span>
                        </div>
                        <span class="px-3">${e.primaryGenreName}</span>
                        <div class="px-3 mb-2 d-flex justify-content-between align-items-center">
                            <span>Songs: ${e.trackCount}</span>
                        </div>
                    </div>
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" class="heart d-none" id="h${e.collectionId}">
                    <g>
                        <g>
                            <path class="st0" d="M256,469.5c-3.9,0-7.7-1.4-10.6-3.9c-20.7-18.1-40.8-35.3-58-49.9c-0.1-0.1-0.3-0.3-0.4-0.4
                                c-48.7-41.5-94.8-80.6-125.4-117.6C29.1,258.6,14,221.8,14,181.9c0-38.6,13.1-74,36.9-99.8C74.7,56.2,107.4,42,143,42
                                c26.5,0,50.7,8.4,72,24.9C226,75.3,236,85.8,244.7,98c2.6,3.6,6.9,5.8,11.4,5.8c4.5,0,8.7-2.2,11.4-5.8
                                c8.8-12.2,18.8-22.7,29.7-31.1C318.4,50.4,342.6,42,369,42c35.6,0,68.3,14.2,92.1,40.1c23.8,25.8,36.9,61.2,36.9,99.8
                                c0,39.8-15.1,76.6-47.6,115.8c-30.1,36.3-74,73.7-124.8,117l-0.6,0.5c-18.3,15.6-38,32.5-58.4,50.3
                                C263.7,468.1,259.9,469.5,256,469.5z"/>
                            <path class="st1" d="M369,56c31.6,0,60.7,12.6,81.8,35.6c21.4,23.2,33.2,55.3,33.2,90.3c0,18.1-3.4,35.3-10.4,52.3
                                c-7.3,17.8-18.4,35.6-34,54.5c-29.3,35.4-72.8,72.4-123.1,115.3l-0.6,0.5c-18.3,15.6-38.1,32.5-58.5,50.4
                                c-0.4,0.3-0.8,0.5-1.4,0.5c-0.6,0-1-0.2-1.4-0.5c-20.7-18.1-40.7-35.2-58-49.9c-0.2-0.2-0.4-0.4-0.6-0.5
                                c-48.3-41.1-93.8-79.8-123.7-115.9c-15.6-18.8-26.8-36.7-34-54.5C31.4,217.2,28,200.1,28,181.9c0-35,11.8-67.1,33.2-90.3
                                C82.3,68.6,111.4,56,143,56c23.3,0,44.7,7.4,63.4,21.9c9.9,7.6,18.9,17.2,26.9,28.3c5.3,7.3,13.7,11.6,22.7,11.6
                                c9,0,17.4-4.3,22.7-11.6c8-11.1,17.1-20.6,27-28.3C324.7,63.2,345.4,56,369,56 M369,28c-29.6,0-56.6,9.3-80.4,27.8
                                c-12,9.3-22.9,20.7-32.5,34c-9.6-13.3-20.5-24.7-32.5-34C199.7,37.3,172.6,28,143,28c-39.5,0-75.9,15.8-102.4,44.6
                                C14.4,101,0,139.8,0,181.9c0,43.3,16.1,82.9,50.8,124.7c31,37.4,75.5,75.4,127.1,119.3l0.1,0.1c17.6,15,37.5,32,58.2,50.1
                                c5.5,4.8,12.5,7.4,19.8,7.4s14.3-2.6,19.8-7.4c20.7-18.1,40.7-35.2,58.3-50.2c51.6-44,96.1-81.9,127.1-119.3
                                c34.6-41.8,50.8-81.4,50.8-124.7c0-42.1-14.4-80.9-40.6-109.3C444.9,43.8,408.5,28,369,28L369,28z"/>
                        </g>
                    </g>
                    </svg>
                </div>
            </a>`
}

// "use strict";

// function createAlbum(e, month, date) {
//   // var time = e.trackTimeMillis/1000
//   // var minutes;
//   // var seconds;
//   // (time/60)<1 ? minutes = "00" : minutes = (Math.floor(time/60));
//   // (time)>60 ? seconds = Math.floor(time)-(60*Math.floor((time/60))) : seconds = Math.floor(time/60);
//   // seconds.toString().length == 1 ? seconds = "0" + seconds : seconds;
//   return "\n        <a href=\"" + e.collectionViewUrl + "\" class=\"result\" id=\"" + e.collectionId + "\"  data-type=\"" + e.collectionType + "\">\n                <div class=\"main__target mx-3 mb-4 d-flex flex-column\">\n                    <div class=\"main__target__img\">\n                        <img src=\"" + e.artworkUrl100 + "\" alt=\"art img\">\n                    </div>\n                    <div class=\" main__target__info d-flex flex-column justify-content-between\">\n                        <div class=\"mt-2 px-3 d-flex flex-column justify-content-between\">\n                            <h4 class=\"main__target__title\">" + truncate(e.collectionName, 30, true) + "</h4>\n                            <h5 class=\"main__target__artist\">" + e.artistName + "</h5>\n                            <h6 class=\"main__target__album\">" + truncate(e.collectionName, 30, true) + "</h6>\n                        </div>\n                        <div class=\"px-3 d-flex justify-content-between smallText\">\n                            <span>" + month[date.getMonth()] + " " + date.getFullYear() + "</span>\n                            <span><span>" + e.collectionPrice + "</span><span> " + e.currency + "</span></span>\n                        </div>\n                        <span class=\"px-3\">" + e.primaryGenreName + "</span>\n                        <div class=\"px-3 mb-2 d-flex justify-content-between align-items-center\">\n                            <span>Songs: " + e.trackCount + "</span>\n                        </div>\n                    </div>\n                    <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n                        viewBox=\"0 0 512 512\" style=\"enable-background:new 0 0 512 512;\" xml:space=\"preserve\" class=\"heart d-none\" id=\"h" + e.collectionId + "\">\n                    <g>\n                        <g>\n                            <path class=\"st0\" d=\"M256,469.5c-3.9,0-7.7-1.4-10.6-3.9c-20.7-18.1-40.8-35.3-58-49.9c-0.1-0.1-0.3-0.3-0.4-0.4\n                                c-48.7-41.5-94.8-80.6-125.4-117.6C29.1,258.6,14,221.8,14,181.9c0-38.6,13.1-74,36.9-99.8C74.7,56.2,107.4,42,143,42\n                                c26.5,0,50.7,8.4,72,24.9C226,75.3,236,85.8,244.7,98c2.6,3.6,6.9,5.8,11.4,5.8c4.5,0,8.7-2.2,11.4-5.8\n                                c8.8-12.2,18.8-22.7,29.7-31.1C318.4,50.4,342.6,42,369,42c35.6,0,68.3,14.2,92.1,40.1c23.8,25.8,36.9,61.2,36.9,99.8\n                                c0,39.8-15.1,76.6-47.6,115.8c-30.1,36.3-74,73.7-124.8,117l-0.6,0.5c-18.3,15.6-38,32.5-58.4,50.3\n                                C263.7,468.1,259.9,469.5,256,469.5z\"/>\n                            <path class=\"st1\" d=\"M369,56c31.6,0,60.7,12.6,81.8,35.6c21.4,23.2,33.2,55.3,33.2,90.3c0,18.1-3.4,35.3-10.4,52.3\n                                c-7.3,17.8-18.4,35.6-34,54.5c-29.3,35.4-72.8,72.4-123.1,115.3l-0.6,0.5c-18.3,15.6-38.1,32.5-58.5,50.4\n                                c-0.4,0.3-0.8,0.5-1.4,0.5c-0.6,0-1-0.2-1.4-0.5c-20.7-18.1-40.7-35.2-58-49.9c-0.2-0.2-0.4-0.4-0.6-0.5\n                                c-48.3-41.1-93.8-79.8-123.7-115.9c-15.6-18.8-26.8-36.7-34-54.5C31.4,217.2,28,200.1,28,181.9c0-35,11.8-67.1,33.2-90.3\n                                C82.3,68.6,111.4,56,143,56c23.3,0,44.7,7.4,63.4,21.9c9.9,7.6,18.9,17.2,26.9,28.3c5.3,7.3,13.7,11.6,22.7,11.6\n                                c9,0,17.4-4.3,22.7-11.6c8-11.1,17.1-20.6,27-28.3C324.7,63.2,345.4,56,369,56 M369,28c-29.6,0-56.6,9.3-80.4,27.8\n                                c-12,9.3-22.9,20.7-32.5,34c-9.6-13.3-20.5-24.7-32.5-34C199.7,37.3,172.6,28,143,28c-39.5,0-75.9,15.8-102.4,44.6\n                                C14.4,101,0,139.8,0,181.9c0,43.3,16.1,82.9,50.8,124.7c31,37.4,75.5,75.4,127.1,119.3l0.1,0.1c17.6,15,37.5,32,58.2,50.1\n                                c5.5,4.8,12.5,7.4,19.8,7.4s14.3-2.6,19.8-7.4c20.7-18.1,40.7-35.2,58.3-50.2c51.6-44,96.1-81.9,127.1-119.3\n                                c34.6-41.8,50.8-81.4,50.8-124.7c0-42.1-14.4-80.9-40.6-109.3C444.9,43.8,408.5,28,369,28L369,28z\"/>\n                        </g>\n                    </g>\n                    </svg>\n                </div>\n            </a>";
// }