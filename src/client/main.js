const { LoaderPage } = require('./views/loader-page');

const { loadPage } = require('./helpers/view-helpers');

const { localeRoute } = require('../utils');


const { router, routeNavigator } = require('./globals');
const { DEFAULT_LANGUAGE } = require('../globals');

window.addEventListener('DOMContentLoaded', () => {
  let firstTime = true;    

  LoaderPage.instance.init(null, firstTime);

  router.addRoutes([{
    rule: `${localeRoute}/?`,
    async handler(page) {
      await loadPage(
        page.match?.[0] || DEFAULT_LANGUAGE,
        page, 'home-page', 
        ['main-layout'],
        firstTime
      );
    }
  }, {
    rule: `${localeRoute}/?sign-in`,
    async handler(page) {
      await loadPage(
        page.match?.[0] || DEFAULT_LANGUAGE,
        page, 
        'sign-in-page', 
        [], 
        firstTime
      );
    }
  }, {
    rule: `${localeRoute}/?sign-up`,
    async handler(page) {
      await loadPage(
        page.match?.[0] || DEFAULT_LANGUAGE,
        page, 
        'sign-up-page', 
        [], 
        firstTime
      );
    }
  }]);

  routeNavigator.addUriListener();

  router
    .processUrl(routeNavigator.fragment, routeNavigator.query)
    .catch(
      reason => console.error(reason)      
    )
    .finally(() => firstTime = false);
});
