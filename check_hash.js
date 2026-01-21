const crypto = require('crypto');
const key = 'abelcjoy';
const hash = crypto.createHash('sha256').update(key).digest('hex');
console.log(hash);
