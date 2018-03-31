require('dotenv').config();
const express = require('express');
const app = express();
const line = require('@line/bot-sdk');
const webhookHandler = require('./handler/line-webhook/v1/');

const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
};

app.get('/', (req, res) => {
    res.send('LP2 Reservation API for line bot');
});

app.post('/line/webhook/v1', line.middleware(config), webhookHandler);

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
    if (err) {
        console.log('Server error', err);
    }

    console.log('server port : ', port);
});