const express = require('express');
const serverless = require('serverless-http');
const app = express();
const cors = require('cors');
const router = express.Router();
require('dotenv').config();
const APIKEY = process.env.APIKEY;


const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
  };
app.use(cors(corsOptions));

router.get('/', async (req, res) => {
    res.send({message: 'ok', cors : {corsOptions}});
});

router.post('/search', async (req, res) => {
    var msg = '';

    const bufferData = req.body;
    const stringValue = JSON.parse(bufferData.toString('utf-8')).name;
    
    const url = "https://api.musixmatch.com/ws/1.1/";
        await fetch(url + `track.search?apikey=${APIKEY}&q=${stringValue}&page_size=10`)
            .then(res => res.json())
            .then(json => msg=json.message.body);
            
    res.json({ msg:msg, api:APIKEY, str:stringValue });
})

router.post('/getLyrics', async (req, res) => {
    var lyrics;
    const bufferData = req.body;
    const stringValue = JSON.parse(bufferData.toString('utf-8')).name;

    const url = "https://api.musixmatch.com/ws/1.1/";
    await fetch(url + `track.lyrics.get?apikey=${APIKEY}&track_id=${stringValue}`)
        .then(res => res.json())
        .then(json => lyrics = json.message.body.lyrics.lyrics_body);
        
        res.json({ lyrics });
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



