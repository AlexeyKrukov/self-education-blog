const dotenv = require('dotenv');
const path = require('path');

const root = path.join.bind(this, __dirname);
dotenv.config({ path: root('.env')});

module.exports = {
    PORT: process.env.PORT || 3001,
    MONGO_URL: 'mongodb://localhost/blog',
    IS_PRODUCTION: process.env.NODE_ENV === 'production'
};
