const express = require('express');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();


router.get('/', (req, res) => {
    res.send('App is running..');
})

app.use('/.netlify/functios/api', router);
module.exports.handler = serverless(app)