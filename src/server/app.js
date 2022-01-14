const { join } = require('path');

const { Router } = require('@azizka/router');

const homeRoutes = require('./home/routes');

const signInRoutes = require('./sign-in/routes');
const signUpRoutes = require('./sign-up/routes');

const authRoutes = require('./auth/routes');

const { checkStaticResponse } = require('./utils');

const { PAGE_ROOT } = require('../globals');

require('./init-environment');

const app = new Router({
  root: PAGE_ROOT,
  async page404(page) {
    if(page.state) {
      page.state.response.statusCode = 404;
      page.state.response.setHeader('Content-Type', 'text/html;charset=UTF-8');
      page.state.response.write(`${page.state.request.method} ${page.state.request.url} not found`);      
    }
  },
  async before(page) {
    if(page.state) {
      const path = join(
        __dirname,
        '../../public',
        page.fragment
      );

      if(checkStaticResponse(page, path)) {
        return true;
      }
    }

    return false;
  }
});

app.addRoutes(homeRoutes);

app.addRoutes(signInRoutes);
app.addRoutes(signUpRoutes);

app.addRoutes(authRoutes);

module.exports = app;
