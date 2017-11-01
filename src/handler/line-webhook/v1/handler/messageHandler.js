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

        if (message.text.startsWith('/date')) {
            return dateHandler(event);
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

const dateHandler = (event) => {
    const eventMessages = event.message;
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
            messages.push(messageGenerator.text('Daftar kegiatan untuk tanggal ' + date));
            const scheduleList = result.body.kegiatan;
            _.forEach(scheduleList, (schedule) => {
                var partMessage = 'Nama kegiatan : ' + schedule.nama_kegiatan;
                partMessage += '\nWaktu mulai   : ' +schedule.waktu_mulai;
                partMessage += '\nWaktu selesai : ' + schedule.waktu_selesai;
                messages.push(messageGenerator.text(partMessage));
            });
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
