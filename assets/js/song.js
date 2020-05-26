function createSong(e, month, date){
    var time = e.trackTimeMillis/1000
    var minutes;
    var seconds;

    (time/60)<1 ? minutes = "00" : minutes = (Math.floor(time/60));
    (time)>60 ? seconds = Math.floor(time)-(60*Math.floor((time/60))) : seconds = Math.floor(time/60);
    seconds.toString().length == 1 ? seconds = "0" + seconds : seconds;

    return `
        <a href="${e.collectionViewUrl}" class="result" id="${e.trackId}">
                <div class="main__target mx-3 mb-4 d-flex flex-column">
                    <div class="main__target__img">
                        <img src="${e.artworkUrl100}" alt="art img">
                    </div>
                    <div class=" main__target__info d-flex flex-column justify-content-between">
                        <div class="mt-2 px-3 d-flex flex-column justify-content-between">
                            <h4 class="main__target__title">${truncate(e.trackName, 40, true)}</h4>
                            <h5 class="main__target__artist">${e.artistName}</h5>
                            <h6 class="main__target__album">${truncate(e.collectionName, 30, true)}</h6>
                        </div>
                        <div class="px-3 d-flex justify-content-between smallText">
                            <span>${month[date.getMonth()]} ${date.getFullYear()}</span>
                            <span><span>${e.trackPrice}</span><span> $</span></span>
                        </div>
                        <span class="px-3">${e.primaryGenreName}</span>
                        <div class="px-3 mb-2 d-flex justify-content-between align-items-center">
                            <button id="p${e.trackId}" class="main__target__preview__btn"></button>
                            <span>${minutes}:${seconds}</span>
                        </div>
                    </div>
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" class="heart d-none" id="h${e.trackId}">
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

function truncate(str, n, useWordBoundary) {
    if (str.length <= n) {
        return str;
    }
    const subString = str.substr(0, n - 1);
    return (useWordBoundary ?
        subString.substr(0, subString.lastIndexOf(" ")) :
        subString) + " (...)";
};

// // function createSong({collectionViewUrl, trackId, artworkUrl100, trackName, artistName, album, price, genere, time}, month, date){
//     function createSong([...args]){
//         return `
//             <a href="${collectionViewUrl}" class="result" id="${trackId}">
//                 <div class="main__target mx-3 mb-4 d-flex flex-column">
//                     <div class="main__target__img">
//                         <img src="${artworkUrl100}" alt="art img">
//                     </div>
//                     <div class=" main__target__info d-flex flex-column justify-content-between">
//                         <div class="mt-2 px-2 d-flex flex-column justify-content-between">
//                             <h4 class="main__target__title">${trackName}</h4>
//                             <h5 class="main__target__artist">${artistName}</h5>
//                             <h6 class="main__artist__album">${album}</h6>
//                         </div>
//                         <div class="px-2 d-flex justify-content-between">
//                             <span>${month[date.getMonth()]} ${date.getFullYear()}</span>
//                             <span>${price}</span>
//                         </div>
//                         <span class="px-2">${genere}</span>
//                         <div class="px-2">
//                             <button>Play</button>
//                             <span>${time}</span>
//                         </div>
//                     </div>
//                     <svg viewBox="0 -28 512.001 512" xmlns="http://www.w3.org/2000/svg" class="heart d-none" id="h${trackId}">
//                     <path d="m256 455.515625c-7.289062
//                     0-14.316406-2.640625-19.792969-7.4375-20.683593-18.085937-40.625-35.082031-58.21875-50.074219l-.089843-.078125c-51.582032-43.957031-96.125-81.917969-127.117188-119.3125-34.644531-41.804687-50.78125-81.441406-50.78125-124.742187
//                     0-42.070313 14.425781-80.882813 40.617188-109.292969 26.503906-28.746094 62.871093-44.578125 102.414062-44.578125 29.554688 0 56.621094
//                     9.34375 80.445312 27.769531 12.023438 9.300781 22.921876 20.683594 32.523438 33.960938 9.605469-13.277344 20.5-24.660157 32.527344-33.960938
//                     23.824218-18.425781 50.890625-27.769531 80.445312-27.769531 39.539063 0 75.910156 15.832031 102.414063 44.578125 26.191406 28.410156 40.613281 67.222656 40.613281
//                     109.292969 0 43.300781-16.132812 82.9375-50.777344 124.738281-30.992187 37.398437-75.53125 75.355469-127.105468 119.308594-17.625 15.015625-37.597657 32.039062-58.328126
//                     50.167969-5.472656 4.789062-12.503906 7.429687-19.789062 7.429687zm-112.96875-425.523437c-31.066406 0-59.605469 12.398437-80.367188 34.914062-21.070312 22.855469-32.675781
//                     54.449219-32.675781 88.964844 0 36.417968 13.535157 68.988281 43.882813 105.605468 29.332031 35.394532 72.960937 72.574219 123.476562 115.625l.09375.078126c17.660156 15.050781
//                     37.679688 32.113281 58.515625 50.332031 20.960938-18.253907 41.011719-35.34375 58.707031-50.417969 50.511719-43.050781 94.136719-80.222656 123.46875-115.617188 30.34375-36.617187
//                     43.878907-69.1875 43.878907-105.605468 0-34.515625-11.605469-66.109375-32.675781-88.964844-20.757813-22.515625-49.300782-34.914062-80.363282-34.914062-22.757812 0-43.652344
//                     7.234374-62.101562 21.5-16.441406 12.71875-27.894532 28.796874-34.609375 40.046874-3.453125 5.785157-9.53125 9.238282-16.261719 9.238282s-12.808594-3.453125-16.261719-9.238282c-6.710937-11.25-18.164062-27.328124-34.609375-40.046874-18.449218-14.265626-39.34375-21.5-62.097656-21.5zm0 0"/>
//                     </svg>
//                 </div>
//             </a>`
//     }