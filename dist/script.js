const APIKEY = '';

const searchButton = document.getElementById("searchBtn");
const searchQuery = document.getElementById("searchQuery");

let tracks;
let lyrics;
searchButton.addEventListener("click", async (e) =>{
   await  postData("http://localhost:8888/.netlify/functions/api/search", { name: searchQuery.value })
    .then((data) => tracks = data.msg.track_list);
    document.getElementById("cards").innerHTML = '';
     tracks.forEach(async track => {
        await postData("http://localhost:8888/.netlify/functions/api/getLyrics", { name: track.track.track_id })
            .then((data) => lyrics = data.lyrics.split('\n'));
            console.log(track);
            lyrics.splice(-4);
            lyrics = lyrics.join(' <br> ');
        document.getElementById("cards").innerHTML += `<div class="col"><div class="card"><div class="card-body"><h4 class="card-title">${track.track.track_name}</h4><h4 class="badge badge-secondary">${track.track.artist_name}</h4><p class="card-text">${lyrics}</p><a href="${track.track.track_share_url}"  target="_blank" class="btn btn-primary">Go to Song</a></div></div></div>`
    });
    
    
})



 


  async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }