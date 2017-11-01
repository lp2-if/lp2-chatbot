const _ = require('lodash');

const welcomeMessage = (firstName) => {
    return `Hello ${firstName}, thankyou for adding me as your friend.\nSend /help for further information`;

};

const helpMessage = () => {
    var messages = 'Below are the currently available commands: ';
    messages += '\n/help to display the list of commands';
    messages += '\n/reserve to make a reservation for LP2';
    messages += '\n/sop to see the SOP of reservation and regulation of LP2';
    messages += '\n/now to check currently activity in LP2';
    messages += '\n/date <YYYY-MM-DD> to check the schedule of LP2 on that date';
    messages += '\n/bye to kick me out of this group';
    return messages;
};

const byeMessage = () => {
    var messages = 'Good Bye!';
    messages += "\nDon't forget to attend your class :p";
    return messages;
};

const joinMessage = () => {
    var messages = 'Hello everybody :)';
    messages += '\nThankyou for inviting me';
    messages += '\nSend /help to display the list of commands';
    messages += '\nHave a good day :D';
    return messages;
};

const dummyMessage = () => {
    var messages = 'Send /help to display the list of commands';
    messages += '\nPlease do not litter :)';
    messages += "\nAnd also tidy up the chairs too ;)";
    messages += '\nBe productive today!';
    return messages;
};

const sopMessage = () => {
    var messages = 'Click the following link to see the SOP of reservation and regulation of LP2';
    messages += '\nilang.in/LP2SOP';
    return messages;
};

const reserveMessage = () => {
    var messages = 'Would you please use the following link to reserve LP2';
    messages += '\nhttp://reservasi.lp2.if.its.ac.id/pinjam';
    return messages;
};

const availableMessage = () => {
    var messages = "LP2 is currently available, you are welcome to visit. Don't be noisy and keep LP2 clean :)";
    return messages;
};

const unavailableMessage = (name, until) => {
    var messages = 'LP2 is currently used for ' + name + ' until ' + until;
    return messages;
};


const groupIdMessage = (groupId) => {
    var messages = `The ID of this group is :\n${groupId}`;
    return messages;
};

const scheduleList = (schedules, date) => {
    var messages = `List of events for ${date} :`;
    _.forEach(schedules, (schedule) => {
        messages += `\n\nName    : ${schedule.nama_kegiatan}`;
        messages += `\nStart time   : ${schedule.waktu_mulai}`;
        messages += `\nFinish time : ${schedule.waktu_selesai}`;
    });
    return messages;
};

const error = () => {
    var messages = 'Oops there is a mistake, please try again.';
    return messages;
};

module.exports = {
    welcomeMessage: welcomeMessage,
    helpMessage: helpMessage,
    defaultMessage: defaultMessage,
    byeMessage: byeMessage,
    joinMessage: joinMessage,
    reserveMessage: reserveMessage,
    sopMessage: sopMessage,
    availableMessage: availableMessage,
    unavailableMessage: unavailableMessage,
    groupIdMessage: groupIdMessage,
    scheduleList: scheduleList,
    error: error
};
