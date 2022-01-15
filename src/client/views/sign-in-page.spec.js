const { JSDOM } = require('jsdom');

const { SignInPage } = require('./sign-in-page');

const { fetchMock } = require('../mocks/fetch-mock');
const { LocationMock } = require('@azizka/router');

const locales = require('../../server/helpers/locale-helpers');

const { context } = require('../globals');
const { DEFAULT_LANGUAGE } = require('../../globals');

describe('SignInPage test', () => {
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

  test('Should get single instance of SignInPage', async () => {
    const instance = SignInPage.instance;

    expect(instance).toBeTruthy();
    expect(instance).toBeInstanceOf(SignInPage);
    expect(instance).toBe(SignInPage.instance);

    expect(instance['node']).toBeFalsy();

    expect(instance['titleElem']).toBeFalsy();

    expect(instance['passwordLabelElem']).toBeFalsy();

    expect(instance['signUpBtn']).toBeFalsy();
    expect(instance['signInBtn']).toBeFalsy();
    expect(instance['cancelBtn']).toBeFalsy();

    expect(instance['authService']).toBeFalsy();
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

    expect(pageInstance['node']).toBeTruthy();
    expect(pageInstance['node']).toBeInstanceOf(HTMLElement);
    expect(pageInstance['node']?.getAttribute('data-page')).toEqual('signin-page');

    expect(pageInstance['titleElem']).toBeTruthy();
    expect(pageInstance['titleElem']).toBeInstanceOf(HTMLElement);
    expect(pageInstance['titleElem']?.textContent).toContain(context.tr('Sign In'));

    expect(pageInstance['passwordLabelElem']).toBeTruthy();
    expect(pageInstance['passwordLabelElem']).toBeInstanceOf(HTMLElement);
    expect(pageInstance['passwordLabelElem']?.textContent).toContain(context.tr('Password'));

    expect(pageInstance['signUpBtn']).toBeTruthy();
    expect(pageInstance['signUpBtn']).toBeInstanceOf(HTMLElement);
    expect(pageInstance['signUpBtn']?.getAttribute('data-button')).toEqual('sign-up');
    expect(pageInstance['signUpBtn']?.getAttribute('href')).toEqual('/ru/sign-up');
    expect(pageInstance['signUpBtn']?.textContent).toContain(context.tr('Sign Up'));

    expect(pageInstance['signInBtn']).toBeTruthy();
    expect(pageInstance['signInBtn']).toBeInstanceOf(HTMLElement);
    expect(pageInstance['signInBtn']?.getAttribute('data-button')).toEqual('sign-in');
    expect(pageInstance['signInBtn']?.textContent).toContain(context.tr('Sign In'));

    expect(pageInstance['cancelBtn']).toBeTruthy();
    expect(pageInstance['cancelBtn']).toBeInstanceOf(HTMLElement);
    expect(pageInstance['cancelBtn']?.getAttribute('data-button')).toEqual('cancel');
    expect(pageInstance['cancelBtn']?.getAttribute('href')).toEqual('/ru/');
    expect(pageInstance['cancelBtn']?.textContent).toContain(context.tr('Cancel'));

    expect(pageInstance['authService']).toBeTruthy();
  });
});


