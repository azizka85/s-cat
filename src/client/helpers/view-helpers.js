const { Translator } = require('@azizka/i18n');

const { DefaultLayout } = require('../views/layouts/default-layout');

const { LoaderPage } = require('../views/loader-page');

const { toCamel } = require('../../utils');

const { layouts, views, context, languages } = require('../globals');

function hideSplash() {
  const splashElem = document.querySelector('.splash');

  splashElem?.classList.remove('splash-open');
}

function getExistingLayout(layoutNames) {
  const reverseLayouts = [...layoutNames].reverse();

  let layout = DefaultLayout.instance;

  for(const layoutName of reverseLayouts) {
    if(!(layoutName in layouts) || layout.content !== layouts[layoutName]) {    
      break;
    }

    layout = layouts[layoutName];
  }

  return layout;
}

async function initLayouts(layoutNames, parent, firstTime) {
  const firstLoad = {};

  for(const layoutName of layoutNames) {
    if(!(layoutName in layouts)) {
      const module = await import(`./views/layouts/${layoutName}.js?time=${Date.now()}`);

      parent = await module.default[toCamel(layoutName)]?.instance?.init?.(parent, firstTime);

      layouts[layoutName] = module.default[toCamel(layoutName)]?.instance;

      firstLoad[layoutName] = true;
    }
  }

  return firstLoad;
}

async function loadLayouts(lang, page, layoutNames, firstLoad) {
  const reverseLayouts = [...layoutNames].reverse();

  let parentLayout = DefaultLayout.instance;
  
  for(const layoutName of reverseLayouts) {
    if(parentLayout['content'] !== layouts[layoutName]) {
      await parentLayout.replaceContent(layouts[layoutName]);
    }

    await layouts[layoutName].load?.(lang, page, firstLoad[layoutName] ?? false);

    parentLayout = layouts[layoutName];
  } 
  
  return parentLayout;
}

async function loadPage(lang, page, name, layoutNames, firstTime) {
  context.page = page;

  let parent = null;

  let pageFirstLoad = false;

  if(!firstTime && (!(lang in languages) || !(name in views))) {
    const layout = getExistingLayout(layoutNames);

    if(layout['content'] !== LoaderPage.instance) {
      await layout.replaceContent(LoaderPage.instance);
    }
  } 

  if(!(lang in languages)) {
    const module = await import(`./locales/${lang}.js?time=${Date.now()}`);

    languages[lang] = Translator.create(module.default);
  }

  context.tr = languages[lang].translate.bind(languages[lang]);

  document.documentElement.lang = lang;
  document.title = context.tr('My Routes');

  if(!(name in views)) {       
    const module = await import(`./views/${name}.js?time=${Date.now()}`);

    parent = await module.default[toCamel(name)]?.instance?.init?.(parent, firstTime);

    views[name] = module.default[toCamel(name)]?.instance;

    pageFirstLoad = true;
  }

  const firstLoad = await initLayouts(layoutNames, parent, firstTime);

  if(context.page.fragment === page.fragment) {
    const layout = await loadLayouts(lang, page, layoutNames, firstLoad);    

    if(layout['content'] !== views[name]) {
      await layout.replaceContent(views[name]);
    }

    await views[name].load?.(lang, page, pageFirstLoad);
  }

  if(firstTime) {
    hideSplash();
  }
}

module.exports = {
  hideSplash,

  getExistingLayout,
  
  initLayouts,
  loadLayouts,

  loadPage
};
