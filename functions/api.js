const express = require('express');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();


router.post('/', (req, res) => {
    const bufferData = req.body.data;
    const stringValue = bufferData.toString('utf-8');
    console.log(stringValue);
    // Save the data of user that was sent by the client
  
    // Send a response to client that will show that the request was successfull.
    res.send({
      message: stringValue,
    });
})

// var data;
// var tracks = [];

//     const url = "https://api.musixmatch.com/ws/1.1/";
//     await fetch(url + `track.search?apikey=${APIKEY}&q_lyrics=${name}&page_size=10`)
//         .then(res => res.json())
//         .then(json => data=json.message.body.track_list);

//     for (let i = 0; i < data.length; i++) {
//         tracks.push(
//             {
//                 "id": data[i].track.track_id,
//                 "track": data[i].track,
//                 "artist": data[i].track.artist_name,
//                 "name": data[i].track.track_name,
//                 "url" : data[i].track.track_share_url
//             }
//             );
//         console.log(+i +1 +" - " + data[i].track.artist_name + " - " + data[i].track.track_name);
        
//     };

//     readline.question(`type number of track\n`, async t => {
//         var track = tracks[t-1];
//         await fetch(url + `track.lyrics.get?apikey=${APIKEY}&track_id=${track.id}`)
//             .then(res => res.json())
//             .then(json => track.lyrics = json.message.body.lyrics.lyrics_body);
        
//         console.log(track);
//     readline.close();
//     });
// });



app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app)



