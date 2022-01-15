const { JSDOM } = require('jsdom');

const { SignInPage } = require('../sign-in-page');
const { AuthServiceComponent } = require('./auth-service-component');

const { fetchMock } = require('../../mocks/fetch-mock');
const { LocationMock } = require('@azizka/router');

const locales = require('../../../server/helpers/locale-helpers');

const { context } = require('../../globals');
const { DEFAULT_LANGUAGE } = require('../../../globals');

describe('AuthServiceComponent test', () => {
  beforeEach(() => {
    const dom = new JSDOM();

    global.window = dom.window;
    global.document = dom.window.document;
  
    global.location = new LocationMock();
    location.pathname = '/ru/sign-in';
    location.search = '';  
  
    global.HTMLElement = dom.window.HTMLElement;
  
    global.fetch = req => fetchMock(req);
  });

  test('Should load content via fetch content data', async () => {
    const pageInstance = SignInPage.instance;

    await pageInstance.init(null, false);

    context.tr = locales[DEFAULT_LANGUAGE].translate.bind(locales[DEFAULT_LANGUAGE]);;

    await pageInstance.load('ru', {
      fragment: '',
      query: {},
      match: [],
      options: {}
    }, true);

    const component = SignInPage.instance['authService']	;
		
		expect(component).toBeTruthy();
		expect(component).toBeInstanceOf(AuthServiceComponent);

		expect(component?.['titleElem']).toBeTruthy();
		expect(component?.['titleElem']).toBeInstanceOf(HTMLElement);
		expect(component?.['titleElem']?.getAttribute('data-title')).toEqual('auth-service');
		expect(component?.['titleElem']?.textContent).toContain(context.tr('Or use the service'));		

		expect(component?.['githubBtn']).toBeTruthy();
		expect(component?.['githubBtn']).toBeInstanceOf(HTMLElement);
		expect(component?.['githubBtn']?.getAttribute('data-button')).toEqual('auth-service-github');
		expect(component?.['githubBtn']?.title).toEqual('GitHub');		

		await SignInPage.instance.load('ru', {
			fragment: '',
			match: [],
			options: {},
			query: {}
		}, false);

		expect(component?.['titleElem']?.textContent).toContain(context.tr('Or use the service'));
  });
});
