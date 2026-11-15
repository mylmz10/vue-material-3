// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';
import { load } from 'js-yaml';

const workflow = load(readFileSync(new URL('../../../.github/workflows/release-please.yml', import.meta.url), 'utf8'));
const steps = workflow.jobs['release-please-pr'].steps;
const reconcileSteps = workflow.jobs['reconcile-release'].steps;
const reconcile = reconcileSteps.find((step) => step.id === 'resolve');
const tagSha = 'a'.repeat(40);
const headSha = 'b'.repeat(40);
let fixture;
beforeEach(() => {
  fixture = mkdtempSync(path.join(tmpdir(), 'release-recovery-'));
  writeFileSync(path.join(fixture, 'package.json'), JSON.stringify({ name: 'vue-material-3', version: '1.2.3' }));
  writeFileSync(path.join(fixture, 'gh'), '#!/bin/sh\n[ "$TEST_RELEASE_EXISTS" = true ]\n', { mode: 0o755 });
  writeFileSync(
    path.join(fixture, 'git'),
    `#!/bin/sh
case "$1" in
  fetch) exit 0 ;;
  rev-parse) if [ "$2" = --verify ] && [ "$3" = 'refs/tags/v1.2.3^{commit}' ] && [ "$TEST_TAG_EXISTS" = true ]; then printf '%s\\n' "$TEST_TAG_SHA"; else exit 1; fi ;;
  show) [ "$2" = "$TEST_TAG_SHA:package.json" ] && printf '%s\\n' "$TEST_RELEASE_PACKAGE" ;;
  *) exit 1 ;;
esac
`,
    { mode: 0o755 }
  );
  writeFileSync(path.join(fixture, 'npm'), '#!/bin/sh\nprintf "%s\\n" "$*" > npm-query\nprintf "%s\\n" "$TEST_NPM_RESPONSE"\nexit "$TEST_NPM_STATUS"\n', { mode: 0o755 });
});
afterEach(() => rmSync(fixture, { recursive: true, force: true }));
const run = (step, env = {}) => {
  const output = path.join(fixture, 'output');
  writeFileSync(output, '');
  const result = spawnSync('bash', ['-c', step.run], {
    cwd: fixture,
    encoding: 'utf8',
    env: {
      ...process.env,
      PATH: `${fixture}${path.delimiter}${process.env.PATH}`,
      GITHUB_OUTPUT: output,
      GITHUB_SHA: headSha,
      GITHUB_RUN_ATTEMPT: '2',
      TEST_RELEASE_EXISTS: 'true',
      TEST_TAG_EXISTS: 'true',
      TEST_TAG_SHA: tagSha,
      TAG_NAME: 'v1.2.3',
      ...env,
    },
  });
  return {
    ...result,
    outputs: Object.fromEntries(
      readFileSync(output, 'utf8')
        .trim()
        .split('\n')
        .filter(Boolean)
        .map((line) => line.split('='))
    ),
  };
};

describe('release recovery', () => {
  const resolve = steps.find((step) => step.id === 'manual-release');
  it('recovers the tag commit rather than current master on a retry', () => {
    const result = run(resolve);
    expect(result.status, result.stderr).toBe(0);
    expect(result.outputs).toEqual({ created: 'false', ready: 'true', tag_name: 'v1.2.3', sha: tagSha });
  });
  it('does not redeploy an old release on an ordinary master push', () => {
    const result = run(resolve, { GITHUB_RUN_ATTEMPT: '1' });
    expect(result.status).toBe(0);
    expect(result.outputs).toEqual({ created: 'false', ready: 'false' });
  });
  it('marks a new manual release ready for creation', () => {
    const result = run(resolve, { TEST_RELEASE_EXISTS: 'false', GITHUB_RUN_ATTEMPT: '1' });
    expect(result.status).toBe(0);
    expect(result.outputs).toEqual({ created: 'true', ready: 'true', tag_name: 'v1.2.3', sha: headSha });
  });
  it('stops recovery when the existing release tag cannot be resolved', () => {
    const result = run(resolve, { TEST_TAG_EXISTS: 'false' });
    expect(result.status).not.toBe(0);
    expect(result.outputs.ready).toBeUndefined();
  });
  it('creates metadata only for new releases and permits retry of publication and docs separately', () => {
    expect(steps.find((step) => step.name === 'Create GitHub release for manual release').if).toContain('steps.manual-release.outputs.created');
    expect(steps.find((step) => step.name === 'Checkout release commit').if).toContain('steps.manual-release.outputs.ready');
    expect(steps.find((step) => step.id === 'publish').if).toContain("steps.npm-publication.outputs.published == 'false'");
    expect(steps.find((step) => step.id === 'deploy-source').if).toContain("steps.npm-publication.outputs.published == 'true'");
    expect(steps.find((step) => step.name === 'Roll back failed release by opening PR').if).toContain("steps.publish.outcome == 'failure'");
  });
});

describe('npm publication status', () => {
  const check = steps.find((step) => step.id === 'npm-publication');
  it.each([
    ['0', '"1.2.3"', 'true'],
    ['1', '{"error":{"code":"E404"}}', 'false'],
  ])('accepts a confirmed registry status %s %s', (TEST_NPM_STATUS, TEST_NPM_RESPONSE, published) => {
    const result = run(check, { TEST_NPM_STATUS, TEST_NPM_RESPONSE });
    expect(result.status, result.stderr).toBe(0);
    expect(result.outputs).toEqual({ published });
  });
  it.each([
    ['1', '{"error":{"code":"E401"}}'],
    ['1', '{"error":{"code":"ETIMEDOUT"}}'],
    ['1', 'not-json'],
    ['0', '"1.2.2"'],
    ['0', '{}'],
  ])('stops rather than guessing on registry failure %s %s', (TEST_NPM_STATUS, TEST_NPM_RESPONSE) => {
    const result = run(check, { TEST_NPM_STATUS, TEST_NPM_RESPONSE });
    expect(result.status).not.toBe(0);
    expect(result.outputs.published).toBeUndefined();
  });
});

describe('publication status before release rollback', () => {
  const rollbackCheck = steps.find((step) => step.id === 'rollback-publication');
  const reconcileCheck = reconcileSteps.find((step) => step.id === 'reconcile-publication');
  const destructiveSteps = [
    [steps, rollbackCheck, 'Roll back failed release by opening PR', {}],
    [reconcileSteps, reconcileCheck, 'Reconcile release by opening rollback PR', { RELEASE_REVISION: tagSha }],
  ];

  it.each(destructiveSteps)('requires a fresh confirmation of absence before %s', (jobSteps, check, operation, env) => {
    const cleanup = jobSteps.find((step) => step.name === operation);
    expect(jobSteps.indexOf(cleanup)).toBe(jobSteps.indexOf(check) + 1);
    expect(cleanup.if).toContain(`steps.${check.id}.outputs.published == 'false'`);
    expect(check.env.REQUIRE_UNPUBLISHED).toBe('true');
    expect(check.run).toBe(steps.find((step) => step.id === 'npm-publication').run);
    const guards = { ...check.env, TAG_NAME: 'v1.2.3', ...env, TEST_RELEASE_PACKAGE: JSON.stringify({ name: 'vue-material-3', version: '1.2.3' }) };
    const published = run(check, { ...guards, TEST_NPM_STATUS: '0', TEST_NPM_RESPONSE: '"1.2.3"' });
    expect(published.status).toBe(1);
    expect(published.outputs.published).toBe('true');
    expect(published.stdout).toContain('Release metadata was preserved.');
    const unknown = run(check, { ...guards, TEST_NPM_STATUS: '1', TEST_NPM_RESPONSE: '{"error":{"code":"ETIMEDOUT"}}' });
    expect(unknown.status).toBe(1);
    expect(unknown.outputs).toEqual({});
    const unpublished = run(check, { ...guards, TEST_NPM_STATUS: '1', TEST_NPM_RESPONSE: '{"error":{"code":"E404"}}' });
    expect(unpublished.status, unpublished.stderr).toBe(0);
    expect(unpublished.outputs.published).toBe('false');
  });

  it('queries the package from the resolved tag instead of master', () => {
    writeFileSync(path.join(fixture, 'package.json'), JSON.stringify({ name: 'new-package', version: '2.0.0' }));
    const result = run(reconcileCheck, {
      RELEASE_REVISION: tagSha,
      REQUIRE_UNPUBLISHED: 'true',
      TEST_RELEASE_PACKAGE: JSON.stringify({ name: 'old-package', version: '1.2.3' }),
      TEST_NPM_STATUS: '1',
      TEST_NPM_RESPONSE: '{"error":{"code":"E404"}}',
    });
    expect(reconcileCheck.env.RELEASE_REVISION).toBe('${{ steps.resolve.outputs.release_sha }}');
    expect(result.status, result.stderr).toBe(0);
    expect(readFileSync(path.join(fixture, 'npm-query'), 'utf8')).toContain('view old-package@1.2.3 version');
  });
});

describe('literal reconcile tags', () => {
  it('passes the input as data and resolves the exact release tag', () => {
    expect(reconcile.env.TAG_NAME).toBe('${{ inputs.reconcile_tag }}');
    expect(reconcile.run).not.toContain('${{');
    const result = run(reconcile, { TAG_NAME: 'v1.2.3' });
    expect(result.status, result.stderr).toBe(0);
    expect(result.outputs).toEqual({ tag_name: 'v1.2.3', release_sha: tagSha });
  });
  it.each(['master', 'v$(exit 17)', 'v`exit 18`', 'v1.2.3"; exit 19; #', 'v1.2.3\nother', '-v1.2.3'])('rejects invalid tag text %s', (TAG_NAME) => {
    const result = run(reconcile, { TAG_NAME });
    expect(result.status).toBe(1);
    expect(result.outputs).toEqual({});
  });
  it('rejects a missing tag without producing a rollback target', () => {
    const result = run(reconcile, { TAG_NAME: 'v1.2.3', TEST_TAG_EXISTS: 'false' });
    expect(result.status).not.toBe(0);
    expect(result.outputs.release_sha).toBeUndefined();
  });
});
