const signInPage = require('../templates/pages/sign-in-page');

const authServiceComponent = require('../templates/components/auth-service-component');

const { renderPage } = require('../helpers/layout-helpers');

const { localeRoute } = require('../../utils');

const { DEFAULT_LANGUAGE, PAGE_ROOT } = require('../../globals');

const { version } = require('../../../package.json');

module.exports = [{
  rule: `${localeRoute}/?sign-in`,
  async handler(page) {
    if(page.state) {
      const lang = page.match?.[0] || DEFAULT_LANGUAGE; 
      
      const data = {};

      if(page.query.ajax && !page.query.init) {
        page.state.response.setHeader('Content-Type', 'application/json;charset=UTF-8');
        page.state.response.write(JSON.stringify(data));        
      } else {
        page.state.response.setHeader('Content-Type', 'text/html;charset=UTF-8');

        page.state.response.write(
          renderPage(
            lang, 
            PAGE_ROOT, 
            version, 
            page, 
            'sign-in-page', 
            signInPage, 
            data,
            undefined,
            {
              'auth-service-component': authServiceComponent
            }            
          )
        );        
      }      
    }
  }
}];
