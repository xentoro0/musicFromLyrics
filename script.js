const APIKEY = '62fec49cc647e9df2fd733a6829c492c';

const searchButton = document.getElementById("searchBtn");
const searchQuery = document.getElementById("searchQuery");

searchButton.addEventListener("click", e =>{
    getSongs(searchQuery.value);
})

async function getSongs(q) {
    const url = "https://api.musixmatch.com/ws/1.1/";
    await fetch(url + `track.search?apikey=${APIKEY}&q_lyrics=${q}&page_size=10`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'no-cors': 'true',
        'Access-Control-Allow-Origin': 'http://192.168.1.4:5501',
        'Access-Control-Allow-Credentials': 'true'
        // Add any additional headers if needed
        },
    })
        .then(res => res.json())
        .then(json => data=json.message.body.track_list);

    
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