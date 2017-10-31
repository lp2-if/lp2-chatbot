const Bluebird = require('bluebird');
const _ = require('lodash');

const messageHandler = require('./helper/messageHandler');
const followHandler = require('./helper/followHandler');

module.exports = (req, res) => {
    Bluebird.all(_.map(req.body.events, handleEvent))
        .then((result) => {
            res.json(result);
        });
};

const handleEvent = (event) => {
    if (_.isEqual(event.type, 'follow')) {
        return followHandler(event);
    }

    if (_.isEqual(event.type, 'message')) {
        return messageHandler(event);
    }
};