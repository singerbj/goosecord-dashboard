const semver = require('semver');
const packageJson = require('./package');

const version = packageJson.engines.node;
if (!semver.satisfies(process.version, version)) {
  console.log(`Required node version ${version} not satisfied with current version ${process.version}.`);
  process.exit(1);
}
