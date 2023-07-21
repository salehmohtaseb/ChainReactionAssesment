const bcrypt = require('bcrypt');
const saltsRounds = 10;

const encrypt = (plainText) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(plainText, saltsRounds, (err, hash) => {
            if (err) return reject(err);

            resolve(hash);
        });
    });
}

module.exports = {
    encrypt
}