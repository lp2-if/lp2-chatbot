const _ = require('lodash');

const welcomeMessage = (firstName) => {
    //return `Hello ${firstName}, terimakasih sudah add bot reservasi LP2.\nSilahkan kirim /help untuk info lebih lanjut`;
    return `Hello ${firstName}, thankyou for adding me as your friend.\nSend /help for further information`;

};

const helpMessage = () => {
    // var messages = 'Berikut daftar perintah yang saat ini ada: ';
    // messages += '\n/help untuk menampilkan daftar perintah';
    // messages += '\n/reserve untuk melakukan reservasi';
    // messages += '\n/sop untuk melihat SOP peminjaman dan peraturan LP2';
    // messages += '\n/now untuk mengecek apakah LP2 sedang digunakan';
    // messages += '\n/date <YYYY-MM-DD> untuk mengecek jadwal LP2 pada tanggal tersebut';
    // messages += '\n/bye untuk kick bot dari group';
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
    // var messages = 'Sampai jumpa!';
    // messages += '\nJangan lupa kelas :p';
    var messages = 'Good Bye!';
    messages += "\nDon't forget to attend your class :p";
    return messages;
};

const joinMessage = () => {
    // var messages = 'Halo semua :)';
    // messages += '\nTerima kasih sudah mengundang saya';
    // messages += '\nKetik /help untuk menampilkan menu';
    // messages += '\nHave a good day :D';
    var messages = 'Hello everybody :)';
    messages += '\nThankyou for inviting me';
    messages += '\nSend /help to display the list of commands';
    messages += '\nHave a good day :D';
    return messages;
};

const dummyMessage = () => {
    // var messages = 'Silahkan tekan /help untuk menampilkan menu';
    // messages += '\nBuanglah sampah pada tempatnya ya :p';
    // messages += '\nRapikan kursi setelah dipakai ya ;)';
    // messages += '\nSelamat produktif';
    var messages = 'Send /help to display the list of commands';
    messages += '\nPlease do not litter :)';
    messages += "\nAnd also tidy up the chairs too ;)";
    messages += '\nBe productive today!';
    return messages;
};

const sopMessage = () => {
    // var messages = 'Klik link berikut untuk melihat SOP dan peraturan LP2';
    var messages = 'Click the following link to see the SOP of reservation and regulation of LP2';
    messages += '\nilang.in/LP2SOP';
    return messages;
};

const reserveMessage = () => {
    // var messages = 'Silahkan gunakan link berikut untuk melakukan reservasi';
    var messages = 'Would you please use the following link to reserve LP2';
    messages += '\nhttp://reservasi.lp2.if.its.ac.id/pinjam';
    return messages;
};

const availableMessage = () => {
    // var messages = 'LP2 sedang tidak dipakai, silahkan datang ke LP2. Jangan berisik dan meninggalkan sampah ya :)';
    var messages = "LP2 is currently available, you are welcome to visit. Don't be noisy and keep LP2 clean :)";
    return messages;
};

const unavailableMessage = (name, until) => {
    // var messages = 'LP2 sedang dipakai untuk ' + name + ' sampai ' + until;
    var messages = 'LP2 is currently used for ' + name + ' until ' + until;
    return messages;
};


const groupIdMessage = (groupId) => {
    // var messages = `Id group ini adalah :\n${groupId}`;
    var messages = `The ID of this group is :\n${groupId}`;
    return messages;
};

const scheduleList = (schedules, date) => {
    // var messages = `Daftar kegiatan untuk tanggal ${date} :`;
    var messages = `List of events for ${date} :`;
    _.forEach(schedules, (schedule) => {
        messages += `\n\nName    : ${schedule.nama_kegiatan}`;
        messages += `\nStart time   : ${schedule.waktu_mulai}`;
        messages += `\nFinish time : ${schedule.waktu_selesai}`;
    });
    return messages;
};

const error = () => {
    // var messages = 'Oops ada kesalahan, silahkan coba lagi.';
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
