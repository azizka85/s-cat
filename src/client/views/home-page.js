const { ScrollActionTo, ScrollActionTop, ScrollEventType } = require('../data/scroll');

const { loadContent } = require('../utils');

const { layouts } = require('../globals');

class HomePage {
  static page = null;

  node = null;

  scrollTopBtn = null;

  scrollTopBtnClickHandler;

  windowScrollHandler;

  currScroll = 0;

  static get instance() {
    if(!HomePage.page) {
      HomePage.page = new HomePage();
    }

    return HomePage.page;
  }

  constructor() {
    this.scrollTopBtnClickHandler = () => {
      layouts['main-layout']?.performAction?.(ScrollActionTop, null);
    };

    this.windowScrollHandler = (event) => {
      const data = event.detail;

      if(data.currScroll <= 0) {
        this.scrollTopBtn?.classList.add('btn-exited');
      } else {
        this.scrollTopBtn?.classList.remove('btn-exited');
      }

      this.currScroll = data.currScroll;
    };
  }

  get elem() {
    return this.node;
  }

  async init(parent, firstTime) {
    let content = await loadContent(parent, firstTime, ['main-layout']);    

    this.node = content.querySelector('[data-page="home-page"]') || null;

    this.scrollTopBtn = this.node?.querySelector('[data-button="scroll-top"]') || null;    
    
    return content;
  }

  async mount() {
    this.scrollTopBtn?.addEventListener('click', this.scrollTopBtnClickHandler);

    layouts['main-layout']?.listen?.(ScrollEventType, this.windowScrollHandler);
  }

  async unmount() {
    this.scrollTopBtn?.removeEventListener('click', this.scrollTopBtnClickHandler);

    layouts['main-layout']?.unlisten?.(ScrollEventType, this.windowScrollHandler);
  }

  async load(lang, page, firstLoad) {
    layouts['main-layout']?.performAction?.(ScrollActionTo, {
      top: this.currScroll,
      noSmooth: true
    });
  }
}

module.exports = {
  HomePage
};
