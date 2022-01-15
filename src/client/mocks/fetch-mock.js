const app = require('../../server/app');

const { ResponseMock } = require('./response-mock');

const { fragment, query } = require('../../server/utils');

async function fetchMock(url) {
  const state = {
    request: {},
    response: new ResponseMock()
  };

  const splits = url.split('?');

  const currentPath = fragment(splits[0], app.rootPath);
  const currentQuery = query(splits[1]);

  await app.processUrl(currentPath, currentQuery, state);

  return state.response;
}

module.exports = {
  fetchMock
};
