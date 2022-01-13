const dotenv = require('dotenv');

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';

module.exports = {
  dev
};
