import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const { build } = require('./src/compiler/bundler');

const { dev } = require('./src/server/init-environment');
const { version } = require('./package.json');

await build(version, dev);

require('./src/server/main');


