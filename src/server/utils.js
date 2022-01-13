const { lstatSync, readFileSync } = require('fs');

const { parseQuery, trimSlashes } = require('@azizka/router');

function fragment(path, root) {
  let value = decodeURI(path);

  if(root !== '/') {
    value = value.replace(root, '');
  }

  return trimSlashes(value);
}

function query(search) {
  if(search) {
    return parseQuery(search);
  }  

  return {};
}

function checkStaticResponse(page, path) {
  if(page.state) {
    try {
      const stat = lstatSync(path);

      if(stat.isFile()) {
        const data = readFileSync(path);

        if(path.endsWith('.js')) {
          page.state.response.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
        } else if(path.endsWith('.svg')) {
          page.state.response.setHeader('Content-Type', 'image/svg+xml');
        } else if(path.endsWith('.png')) {
          page.state.response.setHeader('Content-Type', 'image/png');
        } else if(path.endsWith('.css')) {
          page.state.response.setHeader('Content-Type', 'text/css; charset=UTF-8');
        }

        page.state.response.write(data);

        return true;
      }
    } catch {}
  }

  return false;
}

module.exports = {
  fragment,
  query,
  checkStaticResponse
};
