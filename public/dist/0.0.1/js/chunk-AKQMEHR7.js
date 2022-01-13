import {
  __commonJS
} from "./chunk-D6SME5GN.js";

// src/globals.js
var require_globals = __commonJS({
  "src/globals.js"(exports, module) {
    var PAGE_ROOT = "/";
    var LANGUAGES = {
      kz: {
        image: "/images/flags/kz.svg",
        label: "\u049A\u0430\u0437\u0430\u049B\u0448\u0430"
      },
      ru: {
        image: "/images/flags/ru.svg",
        label: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439"
      },
      en: {
        image: "/images/flags/en.svg",
        label: "English"
      }
    };
    var DEFAULT_LANGUAGE = "kz";
    module.exports = {
      PAGE_ROOT,
      LANGUAGES,
      DEFAULT_LANGUAGE
    };
  }
});

// node_modules/@azizka/router/src/utils.js
var require_utils = __commonJS({
  "node_modules/@azizka/router/src/utils.js"(exports, module) {
    function trimSlashes(path) {
      return path.replace(/\/$/, "").replace(/^\//, "");
    }
    function transformURL(url, currentPath, root) {
      const newUrl = url.trim();
      const splits = newUrl.split("?");
      let path = splits[0].trim();
      const query = splits[1]?.trim();
      if (!path) {
        path = currentPath;
      } else {
        if (root !== "/") {
          path = path.replace(root, "");
        }
        path = trimSlashes(path);
      }
      if (!query) {
        return path;
      }
      return `${path}?${query}`;
    }
    function parseQuery(query) {
      const data = {};
      let search = query;
      if (query[0] === "?") {
        search = query.substring(1);
      }
      search.split("&").forEach((row) => {
        const parts = row.split("=");
        if (parts[0] !== "") {
          const key = decodeURIComponent(parts[0]);
          const value = parts[1] === void 0 ? "1" : parts[1];
          data[key] = value;
        }
      });
      return data;
    }
    function parseRouteRule(route) {
      if (typeof route === "string") {
        const uri = trimSlashes(route);
        const rule = uri.replace(/([\\\/\-\_\.])/g, "\\$1").replace(/\{[a-zA-Z]+\}/g, "(:any)").replace(/\:any/g, "[\\w\\-\\_\\.]+").replace(/\:word/g, "[a-zA-Z]+").replace(/\:num/g, "\\d+");
        return new RegExp(`^${rule}$`, "i");
      }
      return route;
    }
    module.exports = {
      trimSlashes,
      transformURL,
      parseQuery,
      parseRouteRule
    };
  }
});

// node_modules/@azizka/router/src/router.js
var require_router = __commonJS({
  "node_modules/@azizka/router/src/router.js"(exports, module) {
    var { trimSlashes, parseRouteRule } = require_utils();
    var Router = class {
      routes = [];
      root = "/";
      before;
      page404;
      constructor(options) {
        this.before = options?.before;
        this.page404 = options?.page404;
        if (options?.root) {
          this.root = options.root === "/" ? "/" : `/${trimSlashes(options.root)}/`;
        }
        if (options?.routes) {
          this.addRoutes(options.routes);
        }
      }
      get rootPath() {
        return this.root;
      }
      addRoutes(routes) {
        for (const route of routes) {
          this.add(route.rule, route.handler, route.options);
        }
      }
      add(rule, handler, options) {
        this.routes.push({
          rule: parseRouteRule(rule),
          handler,
          options
        });
        return this;
      }
      remove(param) {
        this.routes.some((route, i) => {
          if (route.handler === param || route.rule === parseRouteRule(param)) {
            this.routes.splice(i, 1);
            return true;
          }
          return false;
        });
        return this;
      }
      findRoute(currentPath) {
        for (const route of this.routes) {
          const match = currentPath.match(route.rule);
          if (match) {
            return {
              match,
              route
            };
          }
        }
      }
      async processUrl(currentPath, currentQuery, state) {
        const doBreak = await this.before?.({
          fragment: currentPath,
          query: currentQuery,
          state
        });
        if (!doBreak) {
          const found = this.findRoute(currentPath);
          if (!found) {
            await this.page404?.({
              fragment: currentPath,
              query: currentQuery,
              state
            });
          } else {
            found.match.shift();
            const page = {
              fragment: currentPath,
              query: currentQuery,
              match: found.match,
              options: found.route.options,
              state
            };
            await found.route.handler?.(page);
          }
        }
      }
    };
    module.exports = {
      Router
    };
  }
});

// node_modules/@azizka/router/src/route-navigator.js
var require_route_navigator = __commonJS({
  "node_modules/@azizka/router/src/route-navigator.js"(exports, module) {
    var { transformURL, trimSlashes, parseQuery } = require_utils();
    var RouteNavigator = class {
      router;
      popStateHandler;
      constructor(router) {
        this.router = router;
        this.popStateHandler = () => {
          router.processUrl(this.fragment, this.query, history.state);
        };
      }
      get fragment() {
        let value = decodeURI(location.pathname);
        if (this.router.rootPath !== "/") {
          value = value.replace(this.router.rootPath, "");
        }
        return trimSlashes(value);
      }
      get query() {
        return parseQuery(location.search);
      }
      async redirectTo(url, state) {
        const newUrl = transformURL(url, this.fragment, this.router.rootPath);
        history.replaceState(state, "", this.router.rootPath + newUrl);
        const currentPath = this.fragment;
        const currentQuery = this.query;
        await this.router.processUrl(currentPath, currentQuery, state);
      }
      async navigateTo(url, state) {
        const newUrl = transformURL(url, this.fragment, this.router.rootPath);
        history.pushState(state, "", this.router.rootPath + newUrl);
        const currentPath = this.fragment;
        const currentQuery = this.query;
        await this.router.processUrl(currentPath, currentQuery, state);
      }
      refresh() {
        return this.redirectTo(this.fragment + location.search, history.state);
      }
      addUriListener() {
        window.addEventListener("popstate", this.popStateHandler);
      }
      removeUriListener() {
        window.removeEventListener("popstate", this.popStateHandler);
      }
    };
    module.exports = {
      RouteNavigator
    };
  }
});

// node_modules/@azizka/router/src/mocks/location-mock.js
var require_location_mock = __commonJS({
  "node_modules/@azizka/router/src/mocks/location-mock.js"(exports, module) {
    var LocationMock = class {
      pathname = "";
      search = "";
    };
    module.exports = {
      LocationMock
    };
  }
});

// node_modules/@azizka/router/src/mocks/history-mock.js
var require_history_mock = __commonJS({
  "node_modules/@azizka/router/src/mocks/history-mock.js"(exports, module) {
    var HistoryMock = class {
      location;
      constructor(location2) {
        this.location = location2;
      }
      replaceState(state, data, path) {
        this.changeLocation(path);
      }
      pushState(state, data, path) {
        this.changeLocation(path);
      }
      changeLocation(path) {
        let splits = path?.split?.("?");
        if (splits) {
          this.location.pathname = splits[0];
          if (splits.length > 1) {
            this.location.search = "?" + splits[1];
          }
        }
      }
    };
    module.exports = {
      HistoryMock
    };
  }
});

// node_modules/@azizka/router/index.js
var require_router2 = __commonJS({
  "node_modules/@azizka/router/index.js"(exports, module) {
    var { Router } = require_router();
    var { RouteNavigator } = require_route_navigator();
    var { trimSlashes, transformURL, parseQuery, parseRouteRule } = require_utils();
    var { LocationMock } = require_location_mock();
    var { HistoryMock } = require_history_mock();
    module.exports = {
      Router,
      RouteNavigator,
      trimSlashes,
      transformURL,
      parseQuery,
      parseRouteRule,
      LocationMock,
      HistoryMock
    };
  }
});

// src/client/globals.js
var require_globals2 = __commonJS({
  "src/client/globals.js"(exports, module) {
    var { Router, RouteNavigator } = require_router2();
    var { PAGE_ROOT } = require_globals();
    var router = new Router({ root: PAGE_ROOT });
    var routeNavigator = new RouteNavigator(router);
    var views = {};
    var layouts = {};
    var languages = {};
    var context = {
      page: void 0,
      tr: void 0
    };
    module.exports = {
      router,
      routeNavigator,
      views,
      layouts,
      languages,
      context
    };
  }
});

// src/client/utils.js
var require_utils2 = __commonJS({
  "src/client/utils.js"(exports, module) {
    var { routeNavigator, layouts } = require_globals2();
    async function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    async function navigateHandler(event, elem) {
      event.preventDefault();
      const path = elem.getAttribute?.("href");
      if (path) {
        await routeNavigator.navigateTo(path);
      }
    }
    async function loadContent(parent, firstTime, layoutNames) {
      let content;
      if (firstTime || parent) {
        content = parent || document.body;
      } else {
        let path = location.pathname + "?ajax=1&init=1&time=" + Date.now();
        const layoutsToLoad = [];
        for (let layout of layoutNames) {
          if (!(layout in layouts)) {
            layoutsToLoad.push(layout);
          }
        }
        if (layoutsToLoad.length > 0) {
          path += "&layouts=" + layoutsToLoad.join(",");
        }
        const html = await (await fetch(path)).text();
        content = document.createElement("div");
        content.innerHTML = html;
      }
      return content;
    }
    async function mount(elem) {
      if (elem) {
        await sleep(10);
        elem.classList.remove("page-unmount");
      }
    }
    async function unmount(elem) {
      if (elem) {
        elem.classList.add("page-unmount");
        await sleep(250);
      }
    }
    module.exports = {
      sleep,
      navigateHandler,
      loadContent,
      mount,
      unmount
    };
  }
});

export {
  require_router2 as require_router,
  require_globals,
  require_globals2,
  require_utils2 as require_utils
};
//# sourceMappingURL=chunk-AKQMEHR7.js.map
