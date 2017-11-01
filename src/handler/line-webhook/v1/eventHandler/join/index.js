const request = require('superagent');
const lineClient = require('../../../../../singleton/lineClient');
const textGenerator = require('../../../../../utils/textGenerator');
const messageGenerator = require('../../../../../utils/messageGenerator');

module.exports = (event) => {
    const messages = [];
    messages.push(messageGenerator.text(textGenerator.joinMessage()));
    return request.get('https://quotes.rest/qod')
        .then((result) => {
            var quotes = result.body.contents.quotes[0].quote;
            quotes += '\n- ' + result.body.contents.quotes[0].author;
            messages.push(messageGenerator.text(quotes));
            return lineClient.replyMessage(event.replyToken, messages);
        });
};