const app = require('../app');

describe('sign-up routes test', () => {
  test('should load page "/sign-up" correctly', async () => {
    let contentType;
    let contentExist = false;

    const state = {
      response: {
        statusCode: 200,
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

    await app.processUrl('sign-up', {}, state);

    expect(state.response.statusCode).toEqual(200);
    expect(contentExist).toBeTruthy();
    expect(contentType).toEqual('text/html;charset=UTF-8');
  });

  test('should load page "/ru/sign-up" correctly', async () => {
    let contentType;
    let contentExist = false;

    const state = {
      response: {
        statusCode: 200,
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

    await app.processUrl('ru/sign-up', {}, state);

    expect(state.response.statusCode).toEqual(200);
    expect(contentExist).toBeTruthy();
    expect(contentType).toEqual('text/html;charset=UTF-8');
  });

  test('should load data from "/sign-up" correctly', async () => {
    let contentType;
    let contentExist = false;

    const state = {
      response: {
        statusCode: 200,
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

    await app.processUrl('sign-up', { ajax: '1' }, state);

    expect(state.response.statusCode).toEqual(200);
    expect(contentExist).toBeTruthy();
    expect(contentType).toEqual('application/json;charset=UTF-8');
  });
});
