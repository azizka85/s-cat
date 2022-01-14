const app = require('./app');

const { version } = require('../../package.json');

describe('app test', () => {
  test('should load static file "favicon.png" correctly', async () => {
    let contentType;
    let contentExist = false;

    const state = {
      response: {
        setHeader(name, value) {
          if(name === 'Content-Type') {
            contentType = value;
          }
        },
        write() {
          contentExist = true;
        }
      }
    };

    await app.processUrl('favicon.png', {}, state);

    expect(contentExist).toBeTruthy();
    expect(contentType).toEqual('image/png');
  });

  test('should load static file "images/flags/kz.svg" correctly', async () => {
    let contentType;
    let contentExist = false;

    const state = {
      response: {
        setHeader(name, value) {
          if(name === 'Content-Type') {
            contentType = value;
          }
        },
        write() {
          contentExist = true;
        }
      }
    };

    await app.processUrl('images/flags/kz.svg', {}, state);

    expect(contentExist).toBeTruthy();
    expect(contentType).toEqual('image/svg+xml');
  });

  test(`should load static file "dist/${version}/js/main.js" correctly`, async () => {
    let contentType;
    let contentExist = false;

    const state = {
      response: {
        setHeader(name, value) {
          if(name === 'Content-Type') {
            contentType = value;
          }
        },
        write() {
          contentExist = true;
        }
      }
    };

    await app.processUrl(`dist/${version}/js/main.js`, {}, state);

    expect(contentExist).toBeTruthy();
    expect(contentType).toEqual('application/javascript; charset=UTF-8');
  });

  test(`should load static file "dist/${version}/css/main.css" correctly`, async () => {
    let contentType;
    let contentExist = false;

    const state = {
      response: {
        setHeader(name, value) {
          if(name === 'Content-Type') {
            contentType = value;
          }
        },
        write() {
          contentExist = true;
        }
      }
    };

    await app.processUrl(`dist/${version}/css/main.css`, {}, state);

    expect(contentExist).toBeTruthy();
    expect(contentType).toEqual('text/css; charset=UTF-8');
  });
});
