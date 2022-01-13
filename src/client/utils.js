const { routeNavigator, layouts } = require('./globals');

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function navigateHandler(event, elem) {
  event.preventDefault();

  const path = elem.getAttribute?.('href');

  if(path) {
    await routeNavigator.navigateTo(path);
  }
}

async function loadContent(parent, firstTime, layoutNames) {
  let content;

  if(firstTime || parent) {
    content = parent || document.body;
  } else {
    let path = location.pathname + '?ajax=1&init=1&time=' + Date.now();

    const layoutsToLoad = [];

    for(let layout of layoutNames) {
      if(!(layout in layouts)) {
        layoutsToLoad.push(layout);
      }
    }

    if(layoutsToLoad.length > 0) {
      path += '&layouts=' + layoutsToLoad.join(',');
    }

    const html = await (await fetch(path)).text();
    
    content = document.createElement('div');

    content.innerHTML = html;
  }

  return content;
}


async function mount(elem) {
  if(elem) {
    await sleep(10);

    elem.classList.remove('page-unmount');
  }
}

async function unmount(elem) {
  if(elem) {
    elem.classList.add('page-unmount');

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
