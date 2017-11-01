const welcomeMessage = (firstName) => {
    return `Hello ${firstName}, terimakasih sudah add bot reservasi LP2.\nSilahkan kirim /help untuk info lebih lanjut`;
};

const helpMessage = () => {
    var messages = 'Berikut daftar perintah yang saat ini ada: ';
    messages += '\n/help untuk menampilkan daftar perintah';
    messages += '\n/reserve untuk melakukan reservasi';
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

const dummyMessage = () => {
    var messages = 'Silahkan tekan /help untuk menampilkan menu';
    messages += '\nBuanglah sampah pada tempatnya ya :p';
    messages += '\nRapikan kursi setelah dipakai ya ;)';
    messages += '\nSelamat produktif';
    return messages;
};

const reserveMessage = () => {
    var messages = 'Silahkan gunakan link berikut untuk melakukan reservasi';
    messages += '\nhttp://reservasi.lp2.if.its.ac.id/pinjam';
    return messages;
};

exports.welcomeMessage = welcomeMessage;
exports.helpMessage = helpMessage;
exports.dummyMessage = dummyMessage;
exports.byeMessage = byeMessage;
exports.joinMessage = joinMessage;
exports.reserveMessage = reserveMessage;