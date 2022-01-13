class LoaderPage {
  static page = null;

  node = null;

  static get instance() {
    if(!LoaderPage.page) {
      LoaderPage.page = new LoaderPage();
    }

    return LoaderPage.page;
  }

  get elem() {
    return this.node;
  }

  async init(parent, firstTime) {
    let content = parent || document.body;

    this.node = content.querySelector('[data-page="loader-page"]');

    return content;
  }
}

module.exports = {
  LoaderPage
};
