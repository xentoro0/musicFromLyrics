const searchButton = document.getElementById("searchBtn");
const searchQuery = document.getElementById("searchQuery");

var tracks = [];
searchButton.addEventListener("click", async (e) =>{
  let tempTracks = await searchData(searchQuery.value);
  tempTracks = tempTracks.msg.track_list;
  tempTracks.forEach(async track => {
    let lyrics = await fetchLyrics(track.track.track_id);
    lyrics.split('\n');
    lyrics.splice(-4);
    lyrics = lyrics.join(' <br> ');
    let t = new Track(track.track.track_id, track.track.track_name, track.track.artist_name, lyrics, track.track.track_share_url);
    tracks.push(t);
  });
  displayTracks();
  console.log(tracks);
})


async function fetchLyrics(id) {
  const response = await fetch("https://musicfromlyrics.netlify.app/.netlify/functions/api/getLyrics", {
    method: "POST",
    mode: "cors",
    cache: "no-cache", 
    credentials: "same-origin", 
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer", 
    body: JSON.stringify('name: id'), 
  });
  return response.json(); 
}  
async function searchData(name) {
  const response = await fetch("https://musicfromlyrics.netlify.app/.netlify/functions/api/search", {
    method: "POST",
    mode: "cors",
    cache: "no-cache", 
    credentials: "same-origin", 
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer", 
    body: JSON.stringify('name: name'), 
  });
  return response.json(); 
}

function displayTracks(){
  document.getElementById("cards").replaceChildren();
  tracks.forEach( track => {
    let e = document.createElement("div")
    e.className = "col";
    e.innerHTML = 
    `
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">${track.name}</h4>
          <h4 class="badge badge-secondary">${track.artist_name}</h4>
          <p class="card-text">${lyrics}</p>
          <a href="${track.share_url}"  target="_blank" class="btn btn-primary">Go to Song</a>
        </div>
      </div>
    `;
    document.getElementById("cards").appendChild(e)
  })
}