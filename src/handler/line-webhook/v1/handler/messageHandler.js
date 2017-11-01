const _ = require('lodash');
const satpam = require('satpam');
const Bluebird = require('bluebird');
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
    const message = event.message;
    if (_.isEqual(message.type, 'text')) {
        if (message.text.startsWith('/now')) {
            return nowHandler(event);
        }

        if (message.text.startsWith('/bye') && (event.source.type == 'group' || event.source.type == 'room')) {
            return byeHandler(event);
        }

        if (message.text.startsWith('/help')) {
            return helpHandler(event);
        }

        if (message.text.startsWith('/sop')) {
            return sopHandler(event);
        }

        if (message.text.startsWith('/date')) {
            return dateHandler(event);
        }

        if (message.text.startsWith('/reserve')) {
            return reservationHandler(event);
        }

        if (message.text.startsWith('/admin/getid')) {
            return adminGetIdHandler(event);
        }
    }

    if (event.source.type == 'user') {
        const messages = messageGenerator.text(textGenerator.dummyMessage());
        return client.replyMessage(event.replyToken, messages);
    }

    return Bluebird.resolve(null);
};

const reservationHandler = (event) => {
    const messages = messageGenerator.text(textGenerator.reserveMessage());
    return client.replyMessage(event.replyToken, messages);
};

const sopHandler = (event) => {
    const messages = messageGenerator.text(textGenerator.sopMessage());
    return client.replyMessage(event.replyToken, messages);
};

const dateHandler = (event) => {
    const eventMessages = event.message.text;
    const date = eventMessages.split(' ', 2)[1];
    const rules = {
        date : ['date', 'dateFormat:YYYY-MM-DD']
    };
    const input = {
        date: date
    };
    const validationResult = satpam.validate(rules, input);
    if (validationResult.success === false) {
        return client.replyMessage(event.replyToken, messageGenerator.text('Format tanggal salah, gunakan format YYYY-MM-DD'));
    }
    var url = 'http://reservasi.lp2.if.its.ac.id/reservasi/Laboratorium%20Pemrograman%202/';
    url += date;
    return request.get(url)
        .then((result) => {
            const messages = [];
            const scheduleList = result.body.kegiatan;
            var scheduleMessage = 'Daftar kegiatan untuk tanggal ' + date + ':';
            _.forEach(scheduleList, (schedule) => {
                scheduleMessage += '\n\nNama : ' + schedule.nama_kegiatan;
                scheduleMessage += '\nMulai   : ' +schedule.waktu_mulai;
                scheduleMessage += '\nSelesai : ' + schedule.waktu_selesai;
            });
            messages.push(messageGenerator.text(scheduleMessage));
            return client.replyMessage(event.replyToken, messages);
        })
        .catch(() => {
            return Bluebird.resolve(null);
        });
};

const adminGetIdHandler = (event) => {
    if (event.source.type != 'group') {
        return Bluebird.resolve(null);
    }
    const extraWord = '\nIni adalah groupId grup ini, untuk keperluan push notif peminjaman';
    const messages = messageGenerator.text(event.source.groupId + extraWord);
    return client.replyMessage(event.replyToken, messages);
};

const nowHandler = (event) => {
    return getCurrentStatus()
        .then((result) => {
            const messages = messageGenerator.text(result);
            return client.replyMessage(event.replyToken, messages);
        });
};

const byeHandler = (event) => {
    const messages = messageGenerator.text(textGenerator.byeMessage());
    return client.replyMessage(event.replyToken, messages)
        .then(() => {
            if (event.source.type == 'group') {
                var groupId = event.source.groupId;
                return client.leaveGroup(groupId);
            }
            var roomId = event.source.roomId;
            return client.leaveRoom(roomId);
        });
};

const helpHandler = (event) => {
    const messages = messageGenerator.text(textGenerator.helpMessage());
    return client.replyMessage(event.replyToken, messages);
};

const getCurrentStatus = () => {
    return request.get('http://reservasi.lp2.if.its.ac.id/feeder/Laboratorium%20Pemrograman%202')
        .then((result) => {
            result = result.body.now[0];
            var messages = '';
            if (result.jumlah == '0') {
                messages = textGenerator.availableMessage();
            } else {
                messages = textGenerator.unavailableMessage(result.nama_kegiatan, result.waktu_selesai_permohonan_peminjaman);
            }
            return Bluebird.resolve(messages);
        });
};
