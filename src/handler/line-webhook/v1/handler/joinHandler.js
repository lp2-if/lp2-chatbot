const line = require('@line/bot-sdk');
const request = require('superagent');
const textGenerator = require('../../../../utils/textGenerator');
const messageGenerator = require('../../../../utils/messageGenerator');
const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
};
const client = new line.Client(config);

module.exports = (event) => {
    const messages = [];
    messages.push(messageGenerator.text(textGenerator.joinMessage()));
    return request.get('https://quotes.rest/qod')
        .then((result) => {
            var quotes = result.body.contents.quotes[0].quote;
            quotes += '\n' + result.body.contents.quotes[0].author;
            messages.push(messageGenerator.text(quotes));
            return client.replyMessage(event.replyToken, messages);
        });
};