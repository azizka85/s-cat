const { trimSlashes } = require('@azizka/router');

const { LANGUAGES } = require('./globals');

function getQueryParameters(query) {
  const parameters = [];

  for(let key of Object.keys(query)) {
    if(query[key]) {
      parameters.push(`${key}=${query[key]}`);
    } else {
      parameters.push(key);
    }
  }

  return parameters.join('&');  
}

function setQueryParameter(query, parameter, value) {
  const data = {...query};

  data[parameter] = value;

  return getQueryParameters(data);
}

function toggleQueryParameter(query, parameter) {
  const data = {...query};

  if(parameter in data) {
    delete data[parameter];

    return getQueryParameters(data);
  }

  return setQueryParameter(data, parameter, '1');
}

function capitalize(input) {
  if(!input) {
    return input;
  }

  const chars = input.split('');

  return chars[0].toUpperCase() + chars.slice(1).join('').toLowerCase();
}

function toCamel(input) {
  const parts = input.split('-');

  return parts.map(item => capitalize(item)).join('');
}

const localeRoute = `(${Object.keys(LANGUAGES).join('|')})?`;

function changeLangPath(url, lang) {
  url = trimSlashes(url);

  const langRoute = new RegExp(`^(${Object.keys(LANGUAGES).join('|')})`);

  const index = url.search(langRoute);

  if(index >= 0) {
    return url.replace(langRoute, lang)
  }

  return `${lang}/${url}`;
}

module.exports = {
  getQueryParameters,
  setQueryParameter,
  toggleQueryParameter,

  capitalize,
  toCamel,

  localeRoute,

  changeLangPath
};
