const _ = require('lodash');
const Bluebird = require('bluebird');
const line = require('@line/bot-sdk');
const request = require('superagent');

const messageGenerator = require('../../../../utils/textGenerator');
const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
};
const client = new line.Client(config);

module.exports = (event) => {
    const message = event.message;
    if (_.isEqual(message.type, 'text')) {
        if (message.text.startsWith('/now')) {
            return getCurrentStatus()
                .then((result) => {
                    const messageObject = {
                        type: 'text',
                        text: result
                    };
                    return client.replyMessage(event.replyToken, messageObject);
                });
        }

        if (message.text.startsWith('/bye') && (event.source.type == 'group' || event.source.type == 'room')) {
            const messages = {
                type: 'text',
                text: messageGenerator.byeMessage()
            };
            return client.replyMessage(event.replyToken, messages)
                .then(() => {
                    if (event.source.type == 'group') {
                        var groupId = event.source.groupId;
                        return client.leaveGroup(groupId);
                    }
                    var roomId = event.source.roomId;
                    return client.leaveRoom(roomId);
                });
        }

        if (message.text.startsWith('/help')) {
            const result = messageGenerator.helpMessage();
            const messageObject = {
                type: 'text',
                text: result
            };
            return client.replyMessage(event.replyToken, messageObject);
        }
    }

    if (event.source.type == 'user') {
        const messages = {
            type: 'text',
            text: messageGenerator.dummyMessage()
        };
        return client.replyMessage(event.replyToken, messages);
    }

    return Bluebird.resolve(null);
};

const getCurrentStatus = () => {
    return request.get('http://reservasi.lp2.if.its.ac.id/feeder/Laboratorium%20Pemrograman%202')
        .then((result) => {
            result = result.body;
            var messages = '';
            if (result.now[0].jumlah == '0') {
                messages = 'LP2 sedang tidak dipakai, silahkan datang ke LP2. Jangan berisik dan meninggalkan sampah ya :)';
            } else {
                messages = 'LP2 sedang dipakai untuk ' + result.now[0].nama_kegiatan + ' sampai ' + result.now[0].waktu_selesai_permohonan_peminjaman;
            }
            return Bluebird.resolve(messages);
        });
};
