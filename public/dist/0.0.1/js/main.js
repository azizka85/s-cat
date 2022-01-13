import {
  require_base_layout,
  require_utils
} from "./chunk-B4QA6YNS.js";
import {
  require_globals,
  require_globals2
} from "./chunk-AKQMEHR7.js";
import {
  __commonJS,
  __publicField
} from "./chunk-D6SME5GN.js";

// src/client/views/loader-page.js
var require_loader_page = __commonJS({
  "src/client/views/loader-page.js"(exports, module) {
    var _LoaderPage = class {
      node = null;
      static get instance() {
        if (!_LoaderPage.page) {
          _LoaderPage.page = new _LoaderPage();
        }
        return _LoaderPage.page;
      }
      get elem() {
        return this.node;
      }
      async init(parent, firstTime) {
        let content = parent || document.body;
        this.node = content.querySelector('[data-page="loader-page"]');
        return content;
      }
    };
    var LoaderPage2 = _LoaderPage;
    __publicField(LoaderPage2, "page", null);
    module.exports = {
      LoaderPage: LoaderPage2
    };
  }
});

// node_modules/@azizka/i18n/src/utils.js
var require_utils2 = __commonJS({
  "node_modules/@azizka/i18n/src/utils.js"(exports, module) {
    function isObject(obj) {
      const type = typeof obj;
      return type === "function" || type === "object" && !!obj;
    }
    module.exports = {
      isObject
    };
  }
});

// node_modules/@azizka/i18n/src/translator.js
var require_translator = __commonJS({
  "node_modules/@azizka/i18n/src/translator.js"(exports, module) {
    var { isObject } = require_utils2();
    var Translator = class {
      data;
      globalContext;
      extension;
      constructor() {
        this.resetContext();
      }
      static create(data) {
        const translator = new Translator();
        translator.add(data);
        return translator;
      }
      translate(text, defaultNumOrFormatting, numOrFormattingOrContext, formattingOrContext) {
        let num = void 0;
        let formatting = void 0;
        let context = this.globalContext;
        if (isObject(defaultNumOrFormatting)) {
          formatting = defaultNumOrFormatting;
          if (isObject(numOrFormattingOrContext)) {
            context = numOrFormattingOrContext;
          }
        } else if (typeof defaultNumOrFormatting === "number") {
          num = defaultNumOrFormatting;
          formatting = numOrFormattingOrContext;
          if (formattingOrContext) {
            context = formattingOrContext;
          }
        } else {
          if (typeof numOrFormattingOrContext === "number") {
            num = numOrFormattingOrContext;
            formatting = formattingOrContext;
          } else {
            formatting = numOrFormattingOrContext;
            if (formattingOrContext) {
              context = formattingOrContext;
            }
          }
        }
        return this.translateText(text, num, formatting, context);
      }
      add(data) {
        if (!this.data) {
          this.data = data;
        } else {
          if (data.values && this.data.values) {
            for (const key of Object.keys(data.values)) {
              this.data.values[key] = data.values[key];
            }
          }
          if (data.contexts && this.data.contexts) {
            for (const context of data.contexts) {
              this.data.contexts.push(context);
            }
          }
        }
      }
      setContext(key, value) {
        his.globalContext[key] = value;
      }
      extend(extension) {
        this.extension = extension;
      }
      clearContext(key) {
        delete this.globalContext[key];
      }
      reset() {
        this.resetData();
        this.resetContext();
      }
      resetData() {
        this.data = {
          values: {},
          contexts: []
        };
      }
      resetContext() {
        this.globalContext = {};
      }
      translateText(text, num, formatting, context) {
        context = context || this.globalContext;
        if (!this.data) {
          return this.useOriginalText("" + text, num, formatting);
        }
        const contextData = this.getContextData(this.data, context);
        let result = null;
        if (contextData) {
          result = this.findTranslation(text, num, formatting, contextData?.values);
        }
        if (result === null) {
          result = this.findTranslation(text, num, formatting, this.data.values);
        }
        if (result === null) {
          result = this.useOriginalText("" + text, num, formatting);
        }
        return result;
      }
      findTranslation(text, num, formatting, data) {
        let value = data?.[text];
        if (value === void 0) {
          return null;
        }
        if (typeof value === "object" && !Array.isArray(value)) {
          if (this.extension) {
            value = "" + this.extension(text, num, formatting, value);
            value = this.applyNumbers(value, num || 0);
            return this.applyFormatting(value, formatting);
          } else {
            return this.useOriginalText("" + text, num, formatting);
          }
        }
        if (num === void 0 && typeof value === "string") {
          return this.applyFormatting(value, formatting);
        } else if (value instanceof Array) {
          for (const triple of value) {
            if (num === void 0 && triple[0] === null && triple[1] === null || num !== void 0 && (triple[0] !== null && num >= triple[0] && (triple[1] === null || num <= triple[1]) || triple[0] === null && triple[1] && num <= triple[1])) {
              const numVal = num || 0;
              const textVal = "" + (triple[2] ?? "");
              const result = this.applyNumbers(textVal, numVal);
              return this.applyFormatting(result, formatting);
            }
          }
        }
        return null;
      }
      applyNumbers(str, num) {
        str = str.replace("-%n", "" + -num);
        str = str.replace("%n", "" + num);
        return str;
      }
      applyFormatting(text, formatting) {
        if (formatting) {
          for (const key of Object.keys(formatting)) {
            const regex = new RegExp(`%{${key}}`, "g");
            text = text.replace(regex, formatting[key]);
          }
        }
        return text;
      }
      getContextData(data, context) {
        if (!data.contexts) {
          return null;
        }
        for (const ctx of data.contexts) {
          let equal = true;
          for (const key of Object.keys(ctx.matches)) {
            const value = ctx.matches[key];
            equal = equal && value === context[key];
          }
          if (equal) {
            return ctx;
          }
        }
        return null;
      }
      useOriginalText(text, num, formatting) {
        if (num === void 0) {
          return this.applyFormatting(text, formatting);
        }
        return this.applyFormatting(text.replace("%n", "" + num), formatting);
      }
    };
    module.exports = {
      Translator
    };
  }
});

// node_modules/@azizka/i18n/index.js
var require_i18n = __commonJS({
  "node_modules/@azizka/i18n/index.js"(exports, module) {
    var { Translator } = require_translator();
    var { isObject } = require_utils2();
    module.exports = {
      Translator,
      isObject
    };
  }
});

// src/client/views/layouts/default-layout.js
var require_default_layout = __commonJS({
  "src/client/views/layouts/default-layout.js"(exports, module) {
    var { BaseLayout } = require_base_layout();
    var _DefaultLayout = class extends BaseLayout {
      static get instance() {
        if (!_DefaultLayout.layout) {
          _DefaultLayout.layout = new _DefaultLayout();
        }
        return _DefaultLayout.layout;
      }
    };
    var DefaultLayout = _DefaultLayout;
    __publicField(DefaultLayout, "layout", null);
    module.exports = {
      DefaultLayout
    };
  }
});

// src/client/helpers/view-helpers.js
var require_view_helpers = __commonJS({
  "src/client/helpers/view-helpers.js"(exports, module) {
    var { Translator } = require_i18n();
    var { DefaultLayout } = require_default_layout();
    var { LoaderPage: LoaderPage2 } = require_loader_page();
    var { toCamel } = require_utils();
    var { layouts, views, context, languages } = require_globals2();
    function hideSplash() {
      const splashElem = document.querySelector(".splash");
      splashElem?.classList.remove("splash-open");
    }
    function getExistingLayout(layoutNames) {
      const reverseLayouts = [...layoutNames].reverse();
      let layout = DefaultLayout.instance;
      for (const layoutName of reverseLayouts) {
        if (!(layoutName in layouts) || layout.content !== layouts[layoutName]) {
          break;
        }
        layout = layouts[layoutName];
      }
      return layout;
    }
    async function initLayouts(layoutNames, parent, firstTime) {
      const firstLoad = {};
      for (const layoutName of layoutNames) {
        if (!(layoutName in layouts)) {
          const module2 = await import(`./views/layouts/${layoutName}.js?time=${Date.now()}`);
          parent = await module2.default[toCamel(layoutName)]?.instance?.init?.(parent, firstTime);
          layouts[layoutName] = module2.default[toCamel(layoutName)]?.instance;
          firstLoad[layoutName] = true;
        }
      }
      return firstLoad;
    }
    async function loadLayouts(lang, page, layoutNames, firstLoad) {
      const reverseLayouts = [...layoutNames].reverse();
      let parentLayout = DefaultLayout.instance;
      for (const layoutName of reverseLayouts) {
        if (parentLayout["content"] !== layouts[layoutName]) {
          await parentLayout.replaceContent(layouts[layoutName]);
        }
        await layouts[layoutName].load?.(lang, page, firstLoad[layoutName] ?? false);
        parentLayout = layouts[layoutName];
      }
      return parentLayout;
    }
    async function loadPage2(lang, page, name, layoutNames, firstTime) {
      context.page = page;
      let parent = null;
      let pageFirstLoad = false;
      if (!firstTime && (!(lang in languages) || !(name in views))) {
        const layout = getExistingLayout(layoutNames);
        if (layout["content"] !== LoaderPage2.instance) {
          await layout.replaceContent(LoaderPage2.instance);
        }
      }
      if (!(lang in languages)) {
        const module2 = await import(`./locales/${lang}.js?time=${Date.now()}`);
        languages[lang] = Translator.create(module2.default);
      }
      context.tr = languages[lang].translate.bind(languages[lang]);
      document.documentElement.lang = lang;
      document.title = context.tr("My Routes");
      if (!(name in views)) {
        const module2 = await import(`./views/${name}.js?time=${Date.now()}`);
        parent = await module2.default[toCamel(name)]?.instance?.init?.(parent, firstTime);
        views[name] = module2.default[toCamel(name)]?.instance;
        pageFirstLoad = true;
      }
      const firstLoad = await initLayouts(layoutNames, parent, firstTime);
      if (context.page.fragment === page.fragment) {
        const layout = await loadLayouts(lang, page, layoutNames, firstLoad);
        if (layout["content"] !== views[name]) {
          await layout.replaceContent(views[name]);
        }
        await views[name].load?.(lang, page, pageFirstLoad);
      }
      if (firstTime) {
        hideSplash();
      }
    }
    module.exports = {
      hideSplash,
      getExistingLayout,
      initLayouts,
      loadLayouts,
      loadPage: loadPage2
    };
  }
});

// src/client/main.js
var { LoaderPage } = require_loader_page();
var { loadPage } = require_view_helpers();
var { localeRoute } = require_utils();
var { router, routeNavigator } = require_globals2();
var { DEFAULT_LANGUAGE } = require_globals();
window.addEventListener("DOMContentLoaded", () => {
  let firstTime = true;
  LoaderPage.instance.init(null, firstTime);
  router.addRoutes([{
    rule: `${localeRoute}/?`,
    async handler(page) {
      await loadPage(page.match?.[0] || DEFAULT_LANGUAGE, page, "home-page", ["main-layout"], firstTime);
    }
  }, {
    rule: `${localeRoute}/?sign-in`,
    async handler(page) {
      await loadPage(page.match?.[0] || DEFAULT_LANGUAGE, page, "sign-in-page", [], firstTime);
    }
  }, {
    rule: `${localeRoute}/?sign-up`,
    async handler(page) {
      await loadPage(page.match?.[0] || DEFAULT_LANGUAGE, page, "sign-up-page", [], firstTime);
    }
  }]);
  routeNavigator.addUriListener();
  router.processUrl(routeNavigator.fragment, routeNavigator.query).catch((reason) => console.error(reason)).finally(() => firstTime = false);
});
//# sourceMappingURL=main.js.map
