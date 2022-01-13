const http = require('http');

const { fragment, query } = require('./utils');

const app = require('./app');

const port = parseInt(process.env.NODE_ENV || '3000');

const server = http.createServer((req, res) => {
  const state = {
    request: req,
    response: res
  };

  const splits = req.url.split('?');

  const currentPath = fragment(splits[0], app.rootPath);
  const currentQuery = query(splits[1]);

  app
    .processUrl(currentPath, currentQuery, state)
    .finally(() => res.end());  
});

server.listen(port, undefined, undefined, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = server;
