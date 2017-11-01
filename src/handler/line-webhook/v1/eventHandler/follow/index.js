const _ = require('lodash');

const messageGenerator = require('../../../../../utils/textGenerator');
const lineClient = require('../../../../../singleton/lineClient');
module.exports = (event) => {
    return lineClient.getProfile(event.source.userId)
        .then((profile) => {
            const firstName = _.split(profile.displayName, ' ')[0];
            const messages = {
                type: 'text',
                text: messageGenerator.welcomeMessage(firstName)
            };
            return lineClient.replyMessage(event.replyToken, messages);
        });
};