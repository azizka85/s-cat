const { mount, unmount } = require('../../utils');

class BaseLayout {
  content = null;

  async replaceContent(content) {
    if(this.content?.replaceSelf) {
      this.content.replaceSelf(content);
    } else {
      await this.content?.unmount?.();
      await unmount(this.content?.elem || null);

      this.content?.elem?.replaceWith(content.elem || '');
      
      await content.mount?.();
      await mount(content.elem);
    }

    this.content = content;
  }
}

module.exports = {
  BaseLayout
};
