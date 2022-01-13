import {
  require_auth_service_component
} from "../chunk-3TPXJTVZ.js";
import {
  require_globals,
  require_globals2,
  require_utils
} from "../chunk-AKQMEHR7.js";
import {
  __commonJS,
  __publicField
} from "../chunk-D6SME5GN.js";

// src/client/views/sign-in-page.js
var require_sign_in_page = __commonJS({
  "src/client/views/sign-in-page.js"(exports, module) {
    var { AuthServiceComponent } = require_auth_service_component();
    var { loadContent, navigateHandler } = require_utils();
    var { context } = require_globals2();
    var { DEFAULT_LANGUAGE } = require_globals();
    var _SignInPage = class {
      node = null;
      titleElem = null;
      emailInputElem = null;
      passwordInputElem = null;
      passwordLabelElem = null;
      signUpBtn = null;
      signInBtn = null;
      cancelBtn = null;
      authService = null;
      signUpBtnClickHandler;
      cancelBtnClickHandler;
      formSubmitHandler;
      static get instance() {
        if (!_SignInPage.page) {
          _SignInPage.page = new _SignInPage();
        }
        return _SignInPage.page;
      }
      constructor() {
        this.formSubmitHandler = (event) => {
          event.preventDefault();
          const form = this.node?.querySelector(".main-card form");
          const data = new FormData(form);
          console.log("Form submited: ");
          data.forEach((value, key) => {
            console.log(key + ":", value);
          });
        };
        this.signUpBtnClickHandler = (event) => navigateHandler(event, this.signUpBtn);
        this.cancelBtnClickHandler = (event) => navigateHandler(event, this.cancelBtn);
      }
      get elem() {
        return this.node;
      }
      async init(parent, firstTime) {
        let content = await loadContent(parent, firstTime, []);
        this.node = content.querySelector('[data-page="signin-page"]') || null;
        const form = this.node?.querySelector(".main-card form");
        this.titleElem = this.node?.querySelector('[data-title="main"]') || null;
        this.emailInputElem = form?.querySelector("#email") || null;
        this.passwordInputElem = form?.querySelector("#password") || null;
        this.passwordLabelElem = form?.querySelector("#password-label") || null;
        this.signUpBtn = form?.querySelector('[data-button="sign-up"]') || null;
        this.signInBtn = form?.querySelector('[data-button="sign-in"]') || null;
        this.cancelBtn = form?.querySelector('[data-button="cancel"]') || null;
        this.authService = new AuthServiceComponent();
        await this.authService.init(this, firstTime);
        return content;
      }
      async mount() {
        const form = this.node?.querySelector(".main-card form");
        form?.addEventListener("submit", this.formSubmitHandler);
        this.signUpBtn?.addEventListener("click", this.signUpBtnClickHandler);
        this.cancelBtn?.addEventListener("click", this.cancelBtnClickHandler);
      }
      async unmount() {
        const form = this.node?.querySelector(".main-card form");
        form?.removeEventListener("submit", this.formSubmitHandler);
        this.signUpBtn?.removeEventListener("click", this.signUpBtnClickHandler);
        this.cancelBtn?.removeEventListener("click", this.cancelBtnClickHandler);
      }
      async load(lang, page, firstLoad) {
        if (this.titleElem) {
          this.titleElem.textContent = context.tr("Sign In");
        }
        if (this.passwordInputElem) {
          this.passwordInputElem.placeholder = context.tr("Password") + "*";
        }
        if (this.passwordLabelElem) {
          this.passwordLabelElem.textContent = context.tr("Password") + "*";
        }
        if (this.signUpBtn) {
          this.signUpBtn.textContent = context.tr("Sign Up");
        }
        if (this.signInBtn) {
          this.signInBtn.textContent = context.tr("Sign In");
        }
        if (this.cancelBtn) {
          this.cancelBtn.textContent = context.tr("Cancel");
        }
        this.signUpBtn?.setAttribute("href", (lang === DEFAULT_LANGUAGE ? "" : `/${lang}`) + "/sign-up");
        this.cancelBtn?.setAttribute("href", (lang === DEFAULT_LANGUAGE ? "" : `/${lang}`) + "/");
        await this.authService?.load?.(lang, page, firstLoad);
      }
    };
    var SignInPage = _SignInPage;
    __publicField(SignInPage, "page", null);
    module.exports = {
      SignInPage
    };
  }
});
export default require_sign_in_page();
//# sourceMappingURL=sign-in-page.js.map
