const { join } = require('path');
const { readFileSync } = require('fs');

const { compile } = require('ejs');

module.exports = compile(
  readFileSync(
    join(__dirname, 'home-page.ejs'), 
    {
      encoding: 'utf8'
    }
  )
);
