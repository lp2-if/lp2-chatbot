const line = require('@line/bot-sdk');
const _ = require('lodash');
const messageGenerator = require('../../../../utils/textGenerator');
const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
};
const client = new line.Client(config);

module.exports = (event) => {
    const messages = {
        type: 'text',
        text: messageGenerator.joinMessage()
    };
    return client.replyMessage(event.replyToken, messages);
};