const { rmSync } = require('fs');
const { execSync } = require('child_process');

const esbuild = require('esbuild');

async function build(version, dev) {
  rmSync(`./public/dist/${version}`, {
    recursive: true,
    force: true
  });

  const clientResult = await esbuild.build({
    entryPoints: {
      './locales/en': './src/locales/en.js',
      './locales/ru': './src/locales/ru.js',
      './locales/kz': './src/locales/kz.js',
      './main': './src/client/main.js',
      './views/layouts/main-layout': './src/client/views/layouts/main-layout.js',
      './views/home-page': './src/client/views/home-page.js',
      './views/sign-in-page': './src/client/views/sign-in-page.js',
      './views/sign-up-page': './src/client/views/sign-up-page.js'
    },
    outdir: `./public/dist/${version}/js`,
    format: 'esm',
    target: 'esnext',
    bundle: true,
    splitting: true,
    sourcemap: dev,
    minify: !dev
  });
  
  console.log('client - ', clientResult);

  const compress = dev ? '--style=expanded' : '--style=compressed';
  const sourceMap = dev ? '--source-map' : '--no-source-map';  

  const stylesResult = execSync(`sass ${compress} ${sourceMap} ./src/client/styles/main.scss ./public/dist/${version}/css/main.css`, {
    encoding: 'utf-8'
  });

  console.log('styles - ' + (stylesResult || 'OK'));
}

module.exports = {
  build
};
