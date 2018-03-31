const _ = require('lodash');
const Bluebird = require('bluebird');

const action = require('./action');

module.exports = (event) => {
    const message = event.message;
    if (_.isEqual(message.type, 'text')) {
        if (message.text.startsWith('/now')) {
            return action.now(event);
        }

        if (message.text.startsWith('/bye') && (event.source.type == 'group' || event.source.type == 'room')) {
            return action.bye(event);
        }

        if (message.text.startsWith('/help')) {
            return action.help(event);
        }

        if (message.text.startsWith('/sop')) {
            return action.sop(event);
        }

        if (message.text.startsWith('/date')) {
            return action.date(event);
        }

        if (message.text.startsWith('/reserve')) {
            return action.reserve(event);
        }

        if (message.text.startsWith('/admin/getid')) {
            return action.getId(event);
        }

        if (message.text.startsWith('/admin/acc')) {
            return action.acc(event);
        }
    }

    if (event.source.type == 'user') {
        return action.defaultResponse(event);
    }

    return Bluebird.resolve(null);
};
