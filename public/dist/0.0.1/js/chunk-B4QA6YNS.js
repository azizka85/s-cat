import {
  require_globals,
  require_router,
  require_utils
} from "./chunk-AKQMEHR7.js";
import {
  __commonJS
} from "./chunk-D6SME5GN.js";

// src/client/views/layouts/base-layout.js
var require_base_layout = __commonJS({
  "src/client/views/layouts/base-layout.js"(exports, module) {
    var { mount, unmount } = require_utils();
    var BaseLayout = class {
      content = null;
      async replaceContent(content) {
        if (this.content?.replaceSelf) {
          this.content.replaceSelf(content);
        } else {
          await this.content?.unmount?.();
          await unmount(this.content?.elem || null);
          this.content?.elem?.replaceWith(content.elem || "");
          await content.mount?.();
          await mount(content.elem);
        }
        this.content = content;
      }
    };
    module.exports = {
      BaseLayout
    };
  }
});

// src/utils.js
var require_utils2 = __commonJS({
  "src/utils.js"(exports, module) {
    var { trimSlashes } = require_router();
    var { LANGUAGES } = require_globals();
    function getQueryParameters(query) {
      const parameters = [];
      for (let key of Object.keys(query)) {
        if (query[key]) {
          parameters.push(`${key}=${query[key]}`);
        } else {
          parameters.push(key);
        }
      }
      return parameters.join("&");
    }
    function setQueryParameter(query, parameter, value) {
      const data = { ...query };
      data[parameter] = value;
      return getQueryParameters(data);
    }
    function toggleQueryParameter(query, parameter) {
      const data = { ...query };
      if (parameter in data) {
        delete data[parameter];
        return getQueryParameters(data);
      }
      return setQueryParameter(data, parameter, "1");
    }
    function capitalize(input) {
      if (!input) {
        return input;
      }
      const chars = input.split("");
      return chars[0].toUpperCase() + chars.slice(1).join("").toLowerCase();
    }
    function toCamel(input) {
      const parts = input.split("-");
      return parts.map((item) => capitalize(item)).join("");
    }
    var localeRoute = `(${Object.keys(LANGUAGES).join("|")})?`;
    function changeLangPath(url, lang) {
      url = trimSlashes(url);
      const langRoute = new RegExp(`^(${Object.keys(LANGUAGES).join("|")})`);
      const index = url.search(langRoute);
      if (index >= 0) {
        return url.replace(langRoute, lang);
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
  }
});

export {
  require_base_layout,
  require_utils2 as require_utils
};
//# sourceMappingURL=chunk-B4QA6YNS.js.map
