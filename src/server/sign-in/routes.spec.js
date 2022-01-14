const app = require('../app');

describe('sign-in routes test', () => {
  test('should load page "/sign-in" correctly', async () => {
    let contentType;
    let contentExist = false;

    const state = {
      response: {
        status: 200,
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

    await app.processUrl('sign-in', {}, state);

    expect(state.response.status).toEqual(200);
    expect(contentExist).toBeTruthy();
    expect(contentType).toEqual('text/html;charset=UTF-8');
  });

  test('should load page "/ru/sign-in" correctly', async () => {
    let contentType;
    let contentExist = false;

    const state = {
      response: {
        status: 200,
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

    await app.processUrl('ru/sign-in', {}, state);

    expect(state.response.status).toEqual(200);
    expect(contentExist).toBeTruthy();
    expect(contentType).toEqual('text/html;charset=UTF-8');
  });

  test('should load data from "/sign-in" correctly', async () => {
    let contentType;
    let contentExist = false;

    const state = {
      response: {
        status: 200,
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

    await app.processUrl('sign-in', { ajax: '1' }, state);

    expect(state.response.status).toEqual(200);
    expect(contentExist).toBeTruthy();
    expect(contentType).toEqual('application/json;charset=UTF-8');
  });
});
