const welcomeMessage = (firstName) => {
    return `Hello ${firstName}, terimakasih sudah add bot reservasi LP2.\nSilahkan kirim /help untuk info lebih lanjut`;
};

const helpMessage = () => {
    var messages = 'Berikut daftar perintah yang saat ini ada: ';
    messages += '\n/help untuk menampilkan daftar perintah';
    messages += '\n/now untuk mengecek apakah LP2 sedang digunakan';
    return messages;
};

const byeMessage = () => {
    var messages = 'Sampai jumpa!';
    messages += '\nJangan lupa kelas :p';
    return messages;
}

const dummyMessage = () => {
    var messages = 'Silahkan tekan /help untuk menampilkan menu';
    messages += '\nBuanglah sampah pada tempatnya ya :p';
    messages += '\nRapikan kursi setelah dipakai ya ;)';
    messages += '\nSelamat produktif';
    return messages;
};

exports.welcomeMessage = welcomeMessage;
exports.helpMessage = helpMessage;
exports.dummyMessage = dummyMessage;
exports.byeMessage = byeMessage;