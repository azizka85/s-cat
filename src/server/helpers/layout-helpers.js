const { Translator } = require('@azizka/i18n');

const defaultLayout = require('../templates/layouts/default-layout');
const mainLayout = require('../templates/layouts/main-layout');

const locales = require('./locale-helpers');

const { toggleQueryParameter, changeLangPath } = require('../../utils');

const { LANGUAGES } = require('../../globals');

const layoutHandlersMap = {
  'main-layout': mainLayoutHandler
};

function stringToArray(param) {
  if(param) {
    const array = param.split(',');

    return array.map(item => item.trim());
  }

  return [];
}

function getLayoutHandlers(layouts) {
  const handlers = [];

  for(const layout of layouts) {
    if(layout in layoutHandlersMap) {
      handlers.push({
        name: layout,
        handler: layoutHandlersMap[layout]
      });
    }
  }

  return handlers;
}

function renderPage(lang, rootLink, version, 
  page, pageName, pageLayout, 
  data, layoutHandlers, partials, helpers
) {
  const translator = lang in locales ? locales[lang] : new Translator();

  partials = {
    ...partials
  };
  
  helpers = {
    ...helpers,
    tr: translator.translate.bind(translator)
  };

  data = {
    ...data,
    lang,
    rootLink
  };

  let viewName = pageName;
  let view = pageLayout;

  if(layoutHandlers) {
    for(const handlerInfo of layoutHandlers) {
      const handler = handlerInfo.handler;

      const viewData = handler(page, 
        {
          lang,
          rootLink,
          data,
          helpers,
          partials,
          viewName,
          view
        }
      );

      data = viewData.data;
      helpers = viewData.helpers;
      partials = viewData.partials;

      view = viewData.view;
      viewName = handlerInfo.name;
    }
  }

  if(!page.query.ajax) {
    if(viewName) {
      partials[viewName] = view;
    }

    view = defaultLayout;    

    data = {
      lang,
      rootLink,
      version,
      content: viewName,
      contentData: data
    };
  }

  return view({ 
    data,
    partials,
    helpers 
  });
}

function mainLayoutHandler(page, input) {
  const view = mainLayout;

  const lang = input.lang;
  const url = page.fragment;
  const rootLink = input.rootLink;

  input.partials[input.viewName] = input.view;

  const helpers = {
    ...input.helpers,
    toggleQueryParameter,
    changeLangPath
  };

  const navigation = page.query['main-layout-navigation'] === '1';
  const search = page.query['main-layout-search'] === '1';  

  const data = {
    lang,
    rootLink,
    navigation,
    search,
    url,
    query: page.query,
    languages: LANGUAGES,
    content: input.viewName,
    contentData: input.data
  };

  return {
    data,
    helpers,
    partials: input.partials,
    view
  };
}

module.exports = {
  layoutHandlersMap,
  stringToArray,
  getLayoutHandlers,
  renderPage,
  mainLayoutHandler
};
