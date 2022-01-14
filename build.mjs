import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const { build } = require('./src/compiler/bundler');

const { version } = require('./package.json');

await build(version, false);
