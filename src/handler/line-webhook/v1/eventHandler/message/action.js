const Bluebird = require('bluebird');
const request = require('superagent');
const satpam = require('satpam');

const lineClient = require('../../../../../singleton/lineClient');
const textGenerator = require('../../../../../utils/textGenerator');
const messageGenerator = require('../../../../../utils/messageGenerator');

const adminGroupId = process.env.ADMIN_GROUP_ID;
const apiRoute = process.env.API_ROUTE;
const reservationSecret = process.env.RESERVATION_SECRET;

const reserve = (event) => {
    const messages = messageGenerator.text(textGenerator.reserveMessage());
    return lineClient.replyMessage(event.replyToken, messages);
};

const sop = (event) => {
    const messages = messageGenerator.text(textGenerator.sopMessage());
    return lineClient.replyMessage(event.replyToken, messages);
};

const bye = (event) => {
    const messages = messageGenerator.text(textGenerator.byeMessage());
    return lineClient.replyMessage(event.replyToken, messages)
        .then(() => {
            if (event.source.type == 'group') {
                const groupId = event.source.groupId;
                return lineClient.leaveGroup(groupId);
            }
            const roomId = event.source.roomId;
            return lineClient.leaveRoom(roomId);
        });
};

const getId = (event) => {
    if (event.source.type != 'group') {
        return Bluebird.resolve(null);
    }
    const messages = textGenerator.groupIdMessage(event.source.groupId);
    return lineClient.replyMessage(event.replyToken, messageGenerator.text(messages));
};

const acc = (event) => {
    if (event.source.type != 'group' || event.source.groupId !== adminGroupId) {
        return Bluebird.resolve(null);
    }
    const eventMessages = event.message.text;
    const reservationCode = eventMessages.split(' ', 3)[1];
    const username = eventMessages.split(' ', 3)[2];
    const rules = {
        reservationCode: ['required'],
        username: ['required']
    };
    const input = {
        reservationCode: reservationCode,
        username: username
    };
    const validationResult = satpam.validate(rules, input);
    if (validationResult.success == false){
        return lineClient.replyMessage(event.replyToken, messageGenerator.text(textGenerator.accInvalid()));
    }
    const url = `http://reservasi.lp2.if.its.ac.id/${apiRoute}/acc`;
    return request.post(url)
        .send({
            kode_permohonan: reservationCode,
            username: username,
            secret: reservationSecret
        })
        .then((result) => {
            const messages = result.body.message;
            return lineClient.replyMessage(event.replyToken, messageGenerator.text(messages));
        })
        .catch((error) => {
            console.error(error);
            return lineClient.replyMessage(event.replyToken, messageGenerator.text(textGenerator.error()));
        });
};

const date = (event) => {
    const eventMessages = event.message.text;
    const date = eventMessages.split(' ', 2)[1];
    const rules = {
        date: ['required', 'date', 'dateFormat:YYYY-MM-DD']
    };
    const input = {
        date: date
    };
    const validationResult = satpam.validate(rules, input);
    if (validationResult.success === false) {
        return lineClient.replyMessage(event.replyToken, messageGenerator.text(textGenerator.dateInvalid()));
    }
    const url = `http://reservasi.lp2.if.its.ac.id/reservasi/Laboratorium%20Pemrograman%202/${date}`;
    return request.get(url)
        .then((result) => {
            const scheduleList = result.body.kegiatan;
            const messages = messageGenerator.text(textGenerator.scheduleList(scheduleList, date));
            return lineClient.replyMessage(event.replyToken, messages);
        })
        .catch(() => {
            return lineClient.replyMessage(event.replyToken, messageGenerator.text(textGenerator.error()));
        });
};

const help = (event) => {
    const messages = messageGenerator.text(textGenerator.helpMessage());
    return lineClient.replyMessage(event.replyToken, messages);
};

const defaultResponse = (event) => {
    const messages = messageGenerator.text(textGenerator.defaultMessage());
    return lineClient.replyMessage(event.replyToken, messages);
};

const now = (event) => {
    return getCurrentStatus()
        .then((result) => {
            const messages = messageGenerator.text(result);
            return lineClient.replyMessage(event.replyToken, messages);
        });
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
        })
        .catch(() => {
            return Bluebird.resolve(textGenerator.error());
        });
};

module.exports = {
    now: now,
    reserve: reserve,
    sop: sop,
    bye: bye,
    getId: getId,
    date: date,
    help: help,
    acc: acc,
    defaultResponse: defaultResponse
};
