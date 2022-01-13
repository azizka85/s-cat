const { BaseLayout } = require('./base-layout');

class DefaultLayout extends BaseLayout {
  static layout = null;    

  static get instance() {
    if(!DefaultLayout.layout) {
      DefaultLayout.layout = new DefaultLayout();
    }

    return DefaultLayout.layout;
  }  
}

module.exports = {
  DefaultLayout
};
