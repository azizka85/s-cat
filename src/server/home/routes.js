const homePage = require('../templates/pages/home-page');

const { renderPage, stringToArray, getLayoutHandlers } = require('../helpers/layout-helpers');

const { localeRoute } = require('../../utils');

const { DEFAULT_LANGUAGE, PAGE_ROOT } = require('../../globals');

const { version } = require('../../../package.json');

module.exports = [{
  rule: `${localeRoute}/?`,
  async handler(page) {
    if(page.state) {
      const lang = page.match?.[0] || DEFAULT_LANGUAGE;    

      const data = {
        time: Date.now()
      };

      if(page.query.ajax && !page.query.init) {
        page.state.response.setHeader('Content-Type', 'application/json;charset=UTF-8');
        page.state.response.write(JSON.stringify(data));        
      } else {
        const layouts = !page.query.ajax
          ? ['main-layout']
          : stringToArray(page.query.layouts);

        const layoutHandlers = getLayoutHandlers(layouts);

        page.state.response.setHeader('Content-Type', 'text/html;charset=UTF-8');

        page.state.response.write(
          renderPage(
            lang, 
            PAGE_ROOT, 
            version, 
            page, 
            'home-page', 
            homePage, 
            data,
            layoutHandlers            
          )
        );        
      }   
    }
  }
}];
