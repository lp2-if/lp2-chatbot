const _ = require('lodash');

const welcomeMessage = (firstName) => {
    return `Hello ${firstName}, terimakasih sudah add bot reservasi LP2.\nSilahkan kirim /help untuk info lebih lanjut`;
};

const helpMessage = () => {
    var messages = 'Berikut daftar perintah yang saat ini ada: ';
    messages += '\n/help untuk menampilkan daftar perintah';
    messages += '\n/reserve untuk melakukan reservasi';
    messages += '\n/sop untuk melihat SOP peminjaman dan peraturan LP2';
    messages += '\n/now untuk mengecek apakah LP2 sedang digunakan';
    messages += '\n/date <YYYY-MM-DD> untuk mengecek jadwal LP2 pada tanggal tersebut';
    messages += '\n/bye untuk kick bot dari group';
    return messages;
};

const byeMessage = () => {
    var messages = 'Sampai jumpa!';
    messages += '\nJangan lupa kelas :p';
    return messages;
};

const joinMessage = () => {
    var messages = 'Halo semua :)';
    messages += '\nTerima kasih sudah mengundang saya';
    messages += '\nKetik /help untuk menampilkan menu';
    messages += '\nHave a good day :D';
    return messages;
};

const defaultMessage = () => {
    var messages = 'Silahkan tekan /help untuk menampilkan menu';
    messages += '\nBuanglah sampah pada tempatnya ya :p';
    messages += '\nRapikan kursi setelah dipakai ya ;)';
    messages += '\nSelamat produktif';
    return messages;
};

const sopMessage = () => {
    var messages = 'Klik link berikut untuk melihat SOP dan peraturan LP2';
    messages += '\nilang.in/LP2SOP';
    return messages;
};

const reserveMessage = () => {
    var messages = 'Silahkan gunakan link berikut untuk melakukan reservasi';
    messages += '\nhttp://reservasi.lp2.if.its.ac.id/pinjam';
    return messages;
};

const availableMessage = () => {
    var messages = 'LP2 sedang tidak dipakai, silahkan datang ke LP2. Jangan berisik dan meninggalkan sampah ya :)';
    return messages;
};

const unavailableMessage = (name, until) => {
    var messages = `LP2 sedang dipakai untuk ${name} sampai ${until}`;
    return messages;
};

const groupIdMessage = (groupId) => {
    var messages = `Id group ini adalah :\n${groupId}`;
    return messages;
};

const scheduleList = (schedules, date) => {
    var messages = `Daftar kegiatan untuk tanggal ${date} :`;
    _.forEach(schedules, (schedule) => {
        messages += `\n\nNama    : ${schedule.nama_kegiatan}`;
        messages += `\nMulai   : ${schedule.waktu_mulai}`;
        messages += `\nSelesai : ${schedule.waktu_selesai}`;
    });
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
    scheduleList: scheduleList
};
