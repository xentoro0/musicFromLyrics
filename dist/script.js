const searchButton = document.getElementById("searchBtn");
const searchQuery = document.getElementById("searchQuery");
const url = "https://musicfromlyrics.netlify.app/.netlify/functions"
var tracks;

searchButton.addEventListener("click", async (e) =>{
  tracks = new Array();
  if(searchQuery.value.length  < 1){
    alert("search for something");
    return
  }
  let tempTracks = await post(`${url}/api/search`,{name: searchQuery.value});
  tempTracks = tempTracks.msg.track_list.map((e) => e.track);

  if(tempTracks.length  < 1){
    alert("no tracks found");
    return
  }

  tempTracks.forEach(async track => {
    if(track.has_lyrics){
      let lyrics = await fetchLyrics(track.track_id);
      let track_id = await post(`${url}/api/getTrackId`, {q: `${track.artist_name} ${track.track_name}`});
      let t = new Track(track.track_id, track.track_name, track.artist_name, lyrics, track.track_share_url, track_id.id);
      tracks.push(t);
      displayTracks();
    }
  });
})

async function fetchLyrics(id) {
  let lyrics;
  const data = await post(`${url}/api/getLyrics`, {name: id});
  lyrics = data.lyrics.message.body.lyrics.lyrics_body.split('\n');
  lyrics.splice(-4);
  lyrics = lyrics.join(' <br> ');
  return lyrics;
}  

function displayTracks(){
  document.getElementById("cards").replaceChildren('');
  tracks.forEach( track => {
    let e = document.createElement("div")
    e.className = "col";
    e.innerHTML = 
    `
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">${track.name}</h4>
          <h4 class="badge badge-secondary">${track.artist_name}</h4>
          <p class="card-text">${track.lyrics}</p>
          <a href="${track.share_url}"  target="_blank" class="btn btn-primary">Go to Song</a>
          <iframe style="border-radius:12px"
            src="https://open.spotify.com/embed/track/${track.embed_id}?utm_source=generator&theme=0"
            width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy">
        </iframe>
        </div>
      </div>
    `;
    document.getElementById("cards").appendChild(e)
  })
}
async function post(url, body){
  const response = await fetch
  (
    url, 
    {
      method: "POST",
      mode: "cors",
      cache: "no-cache", 
      credentials: "same-origin", 
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer", 
      body: JSON.stringify(body), 
    }
  );
  return await response.json(); 
}