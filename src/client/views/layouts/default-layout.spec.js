const { JSDOM } = require('jsdom');

const { SignInPage } = require('../sign-in-page');
const { SignUpPage } = require('../sign-up-page');

const { DefaultLayout } = require('./default-layout');

const { fetchMock } = require('../../mocks/fetch-mock');

const { LocationMock } = require('@azizka/router');

describe('DefaultLayout test', () => {
  beforeEach(() => {
    const dom = new JSDOM();

    global.document = dom.window.document;

    global.location = new LocationMock();

    global.fetch = req => fetchMock(req);
  });

  test('Should get single instance of DefaultLayout', () => {
    const instance = DefaultLayout.instance;
    
    expect(instance).toBeTruthy();
    expect(instance).toBeInstanceOf(DefaultLayout);
    expect(instance).toBe(DefaultLayout.instance);
  });

  test('Should replace content correctly', async () => {
    const instance = DefaultLayout.instance;

    const signInPage = SignInPage.instance;
    const signUpPage = SignUpPage.instance;

    await signInPage.init(null, false);
    await signUpPage.init(null, false);

    await instance.replaceContent(signInPage)

    expect(instance.content).toBe(signInPage);

    await instance.replaceContent(signUpPage);

    expect(instance.content).toBe(signUpPage);
  });
});
