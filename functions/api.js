const express = require('express');
const serverless = require('serverless-http');
const app = express();
const cors = require('cors');
const router = express.Router();
require('dotenv').config();
const axios = require('axios');
const mysql = require('mysql');
const querystring = require('querystring');

const con = mysql.createConnection({
  host: "sql11.freemysqlhosting.net",
  user: "sql11689752",
  password: "CrJuuZLnEV",
  database: "sql11689752"
});

const APIKEY = process.env.APIKEY;

const corsOptions = {
    origin: ['*'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
  };
app.use(cors());

router.get('/', async (req, res) => {
    res.send({message: 'ok', cors : ['no',corsOptions]});
});

router.get('/db-connection', async (req, res) => {
con.connect(function(err) {
    if (err) throw err;
    con.query("select * from favorites", function(err, result) {
        if (err) throw err;
    res.send({result});
    });
});
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

router.post('/getTrackId', async (req, res) => {
    const q = req.body.q;
    const data = await fetchData(`https://api.spotify.com/v1/search?q=${q}&type=track%2Cartist`);
    res.json({data})
});

router.post('/getLyrics', async (req, res) => {
    var lyrics;
    const bufferData = req.body;
    const stringValue = JSON.parse(bufferData.toString('utf-8')).name;

    const url = "https://api.musixmatch.com/ws/1.1/";
    await fetch(url + `track.lyrics.get?apikey=${APIKEY}&track_id=${stringValue}`)
        .then(res => res.json())
        .then(json => lyrics = json);
        
        res.json({ lyrics });
})
async function fetchData(url){
    try {
        const accessToken = process.env.SPOTIFY_TOKEN; 
    
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
    
        const spotifyData = response.data;
        return spotifyData;
      } catch (error) {
        console.error('Error making Spotify API request:', error.message);
        return({ error: 'Internal Server Error' });
      }
}


app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app)



