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

const compare = (plainText, hash) => {
    return new Promise((resolve) => {
        bcrypt.compare(plainText, hash, (err, compareResult) => {
            if (err) return resolve(false);

            resolve(compareResult);
        });
    });
}

module.exports = {
    encrypt,
    compare
}