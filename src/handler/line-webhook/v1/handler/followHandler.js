const line = require('@line/bot-sdk');
const request = require('superagent');
const _ = require('lodash');
const messageGenerator = require('../../../../utils/textGenerator');
const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
};
const client = new line.Client(config);

module.exports = (event) => {
    const messages = [];
    return client.getProfile(event.source.userId)
        .then((profile) => {
            const firstName = _.split(profile.displayName, ' ')[0];
            messages.push({
                type: 'text',
                text: messageGenerator.welcomeMessage(firstName)
            });
            return request.get('https://quotes.rest/qod')
        })
        .then((result) => {
            var quotes = result.body.contents.quotes[0].quote;
            quotes += '\n- ' + result.body.contents.quotes[0].author;
            messages.push(messageGenerator.text(quotes));
            return client.replyMessage(event.replyToken, messages);
        });
};