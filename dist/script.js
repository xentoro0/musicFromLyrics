const APIKEY = '62fec49cc647e9df2fd733a6829c492c';

const searchButton = document.getElementById("searchBtn");
const searchQuery = document.getElementById("searchQuery");

searchButton.addEventListener("click", e =>{
    getSongs(searchQuery.value);
})

async function getSongs(q) {
    const url = "https://api.musixmatch.com/ws/1.1/";
    await fetch(url + `track.search?apikey=${APIKEY}&q_lyrics=${q}&page_size=10`, {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': 'https://xentoro0.github.io/musicFromLyrics/',
          'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      })
        .then(res => console.log(res))
        // .then(json => data=json.message.body.track_list);

    
    for (let i = 0; i < data.length; i++) {
        tracks.push(
            {
                "id": data[i].track.track_id,
                "track": data[i].track,
                "artist": data[i].track.artist_name,
                "name": data[i].track.track_name,
                "url" : data[i].track.track_share_url
            }
            );
        console.log(+i +1 +" - " + data[i].track.artist_name + " - " + data[i].track.track_name);
        
    };
}