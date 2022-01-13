const { Router, RouteNavigator } = require('@azizka/router');

const { PAGE_ROOT } = require('../globals');

const router = new Router({ root: PAGE_ROOT });
const routeNavigator = new RouteNavigator(router);

const views = {};
const layouts = {};

const languages = {};

const context = {
  page: undefined,
  tr: undefined
};

module.exports = {
  router,
  routeNavigator,

  views,
  layouts,

  languages,

  context
};
