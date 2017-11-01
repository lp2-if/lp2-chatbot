const Bluebird = require('bluebird');
const _ = require('lodash');

const messageHandler = require('./eventHandler/message/');
const followHandler = require('./eventHandler/follow/');
const joinHandler = require('./eventHandler/join/');

module.exports = (req, res) => {
    Bluebird.all(_.map(req.body.events, handleEvent))
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.error(err);
        });
};

const handleEvent = (event) => {
    if (_.isEqual(event.type, 'follow')) {
        return followHandler(event);
    }

    if (_.isEqual(event.type, 'message')) {
        return messageHandler(event);
    }

    if (_.isEqual(event.type, 'join')) {
        return joinHandler(event);
    }
};