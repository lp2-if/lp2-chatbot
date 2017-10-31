const line = require('@line/bot-sdk');
const _ = require('lodash');
const messageGenerator = require('../../../../utils/textGenerator');
const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
};
const client = new line.Client(config);

module.exports = (event) => {
    return client.getProfile(event.source.userId)
        .then((profile) => {
            const firstName = _.split(profile.displayName, ' ')[0];
            const messages = {
                type: 'text',
                text: messageGenerator.welcomeMessage(firstName)
            };
            return client.replyMessage(event.replyToken, messages);
        });
};