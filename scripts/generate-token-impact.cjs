const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');

const repoRoot = process.cwd();
const components = execSync("rg --files src/components -g '*.vue'", {encoding: 'utf8'})
  .trim()
  .split('\n')
  .filter(Boolean);

function readKeysFromTokenModule(moduleName) {
  const tokenFile = path.join(repoRoot, 'src/styles/tokens', `_${moduleName}.scss`);
  if (!fs.existsSync(tokenFile)) return null;
  const src = fs.readFileSync(tokenFile, 'utf8');
  return new Set([...src.matchAll(/'([a-z0-9-]+)'\s*:/g)].map((m) => m[1]));
}

function getLineNumber(src, index) {
  return src.slice(0, index).split('\n').length;
}

function findThemeScopes(src) {
  const assignRegex = /\$([a-zA-Z0-9_-]+)\s*:\s*tokens\.([a-z0-9-]+)-values\(/g;
  const scopes = [];
  const matches = [...src.matchAll(assignRegex)];

  for (let i = 0; i < matches.length; i++) {
    const m = matches[i];
    const varName = m[1];
    const moduleName = m[2];
    const start = m.index;
    const end = i + 1 < matches.length ? matches[i + 1].index : src.length;
    const segment = src.slice(start, end);

    const mapGetRegex = new RegExp(`map\\.get\\(\\$${varName},\\s*['\"]?([a-z0-9-]+)['\"]?\\)`, 'g');
    const keys = [...segment.matchAll(mapGetRegex)].map((k) => k[1]);

    scopes.push({
      varName,
      moduleName,
      line: getLineNumber(src, start),
      keys: [...new Set(keys)],
    });
  }

  return scopes;
}

const rows = [];
for (const file of components) {
  const src = fs.readFileSync(file, 'utf8');
  const scopes = findThemeScopes(src);
  if (!scopes.length) continue;

  for (const scope of scopes) {
    const tokenKeys = readKeysFromTokenModule(scope.moduleName);
    if (!tokenKeys) {
      rows.push({
        status: 'removed-module',
        file,
        line: scope.line,
        module: scope.moduleName,
        detail: 'token module missing',
      });
      continue;
    }

    const missing = scope.keys.filter((k) => !tokenKeys.has(k));
    if (missing.length) {
      rows.push({
        status: 'missing-key',
        file,
        line: scope.line,
        module: scope.moduleName,
        detail: missing.join(', '),
      });
    }
  }
}

const by = rows.reduce((acc, row) => {
  acc[row.status] = (acc[row.status] || 0) + 1;
  return acc;
}, {});

let upstreamSha = 'unknown';
try {
  upstreamSha = execSync('git -C /tmp/material-web-v0_192 rev-parse HEAD', {encoding: 'utf8'}).trim();
} catch {}

let out = '';
out += '# Token Upgrade Impact Matrix (v0_192)\n\n';
out += `- Upstream source: material-components/material-web@${upstreamSha}\n`;
out += `- Generated at: ${new Date().toISOString()}\n\n`;
out += '## Summary\n\n';
out += `- missing-key: ${by['missing-key'] || 0}\n`;
out += `- removed-module: ${by['removed-module'] || 0}\n\n`;
out += '## Details\n\n';
out += '| Status | Component file | Token module | Missing / detail |\n';
out += '|---|---|---|---|\n';

if (!rows.length) {
  out += '| ok | - | - | No unresolved module/key mismatches detected by scoped static scan |\n';
} else {
  for (const row of rows) {
    out += `| ${row.status} | ${row.file}:${row.line} | ${row.module} | ${row.detail.replace(/\|/g, '\\|')} |\n`;
  }
}

fs.mkdirSync(path.join(repoRoot, 'docs'), {recursive: true});
fs.writeFileSync(path.join(repoRoot, 'docs/token-upgrade-impact.md'), out);

console.log(JSON.stringify({summary: by, rows: rows.length}, null, 2));
