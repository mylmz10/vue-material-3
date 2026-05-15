import fs from 'node:fs';

const [, , version, notes = 'Manual release.'] = process.argv;

if (!version) {
  throw new Error('Usage: node scripts/prepare-manual-release.mjs <version> [notes]');
}

const today = new Date().toISOString().slice(0, 10);

const manifestPath = '.release-please-manifest.json';
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
manifest['.'] = version;
fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

const changelogPath = 'CHANGELOG.md';
const changelog = fs.readFileSync(changelogPath, 'utf8');
const currentVersion = changelog.match(/^## \[([^\]]+)\]/m)?.[1] ?? 'previous';
const releaseHeader = `## [${version}](https://github.com/mylmz10/vue-material-3/compare/v${currentVersion}...v${version}) (${today})`;
const releaseNotes = notes
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter(Boolean)
  .map((line) => `* ${line}`)
  .join('\n');
const releaseBlock = `${releaseHeader}\n\n\n### Changes\n\n${releaseNotes || '* Manual release.'}\n\n`;

const unreleasedHeading = '## Unreleased\n\n';
if (!changelog.includes(unreleasedHeading)) {
  throw new Error('Could not find Unreleased section in CHANGELOG.md');
}

const updatedChangelog = changelog.replace(unreleasedHeading, `${unreleasedHeading}${releaseBlock}`);
fs.writeFileSync(changelogPath, updatedChangelog);
