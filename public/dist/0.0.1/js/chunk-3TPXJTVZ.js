import {
  require_globals,
  require_globals2
} from "./chunk-AKQMEHR7.js";
import {
  __commonJS
} from "./chunk-D6SME5GN.js";

// src/client/views/components/auth-service-component.js
var require_auth_service_component = __commonJS({
  "src/client/views/components/auth-service-component.js"(exports, module) {
    var { context } = require_globals2();
    var { DEFAULT_LANGUAGE } = require_globals();
    var AuthServiceComponent = class {
      titleElem = null;
      githubBtn = null;
      async init(view, firstTime) {
        this.titleElem = view.elem?.querySelector('[data-title="auth-service"]') || null;
        this.githubBtn = view.elem?.querySelector('[data-button="auth-service-github"]') || null;
      }
      async load(lang, page, firstLoad) {
        if (this.titleElem) {
          this.titleElem.textContent = context.tr("Or use the service");
        }
        const langQuery = lang === DEFAULT_LANGUAGE ? "" : `?lang=${lang}`;
        if (this.githubBtn) {
          this.githubBtn.setAttribute("href", `/auth/service/github${langQuery}`);
        }
      }
    };
    module.exports = {
      AuthServiceComponent
    };
  }
});

export {
  require_auth_service_component
};
//# sourceMappingURL=chunk-3TPXJTVZ.js.map
