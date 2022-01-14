const app = require('../app');

describe('home routes test', () => {
  test('should load page "/" correctly', async () => {
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

    await app.processUrl('', {}, state);

    expect(state.response.status).toEqual(200);
    expect(contentExist).toBeTruthy();
    expect(contentType).toEqual('text/html;charset=UTF-8');
  });

  test('should load page "/ru" correctly', async () => {
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

    await app.processUrl('ru', {}, state);

    expect(state.response.status).toEqual(200);
    expect(contentExist).toBeTruthy();
    expect(contentType).toEqual('text/html;charset=UTF-8');
  });

  test('should load data from "/" correctly', async () => {
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

    await app.processUrl('', { ajax: '1' }, state);

    expect(state.response.status).toEqual(200);
    expect(contentExist).toBeTruthy();
    expect(contentType).toEqual('application/json;charset=UTF-8');
  });
});
