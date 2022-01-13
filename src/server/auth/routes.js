const github = require('./handlers/github');

module.exports = [{
  rule: 'auth/service/(:word)',
  async handler(page) {
    if(page.state) {
      const name = page.match?.[0];

      switch(name) {
        case 'github': 
          github.service(page);
          break;
      }
    }
  }
}, {
  rule: 'auth/callback/(:word)',
  async handler(page) {
    if(page.state) {
      const name = page.match?.[0];

      switch(name) {
        case 'github': 
          await github.callback(page);
          break;
      }
    }
  }
}];
