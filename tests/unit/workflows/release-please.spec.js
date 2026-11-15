// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { load } from 'js-yaml';

const workflow = load(readFileSync(new URL('../../../.github/workflows/release-please.yml', import.meta.url), 'utf8'));
const deployment = load(readFileSync(new URL('../../../.github/workflows/deploy-storybook.yml', import.meta.url), 'utf8'));
const steps = workflow.jobs['release-please-pr'].steps;
const deploySteps = deployment.jobs.deploy.steps;
const releaseRef = '${{ steps.release-meta.outputs.sha || steps.manual-release.outputs.sha }}';
const releaseTag = '${{ steps.release-meta.outputs.tag_name || steps.manual-release.outputs.tag_name }}';
const sha = 'a'.repeat(40);
const require = createRequire(import.meta.url);
const semverModules = path.dirname(path.dirname(require.resolve('semver/package.json')));
let fixture;

beforeEach(() => {
  fixture = mkdtempSync(path.join(tmpdir(), 'release-check-'));
  writeFileSync(path.join(fixture, 'package.json'), JSON.stringify({ version: '1.2.3' }));
  writeFileSync(
    path.join(fixture, 'npm'),
    `#!/bin/sh
[ "$1 $2 $3" = "view vue-material-3@latest version" ] || exit 1
attempt=1
if [ -f npm-attempt ]; then attempt=$(($(cat npm-attempt) + 1)); fi
echo "$attempt" > npm-attempt
if [ "$attempt" -lt "$TEST_NPM_SETTLES_AT" ]; then
  echo '"1.2.2"'
else
  printf '%s\\n' "$TEST_NPM_RESPONSE"
fi
exit "$TEST_NPM_STATUS"
`,
    { mode: 0o755 }
  );
  writeFileSync(path.join(fixture, 'sleep'), '#!/bin/sh\n[ "$1" = 5 ]\n', { mode: 0o755 });
  writeFileSync(
    path.join(fixture, 'git'),
    '#!/bin/sh\ncase "$*" in\n  "rev-parse HEAD") echo "$TEST_HEAD_SHA" ;;\n  "rev-parse --verify refs/tags/"*) test -n "$TEST_TAG_SHA" && echo "$TEST_TAG_SHA" ;;\n  *) exit 1 ;;\nesac\n',
    { mode: 0o755 }
  );
});

afterEach(() => rmSync(fixture, { recursive: true, force: true }));

const validate = (overrides = {}) => {
  const step = steps.find((entry) => entry.name === 'Verify release source and version');
  expect(step, 'release identity must be verified before publishing').toBeDefined();
  return spawnSync('bash', ['-c', step.run], {
    cwd: fixture,
    env: { ...process.env, PATH: `${fixture}${path.delimiter}${process.env.PATH}`, RELEASE_SHA: sha, RELEASE_TAG: 'v1.2.3', TEST_HEAD_SHA: sha, TEST_TAG_SHA: sha, ...overrides },
    encoding: 'utf8',
  });
};

describe('release publication source', () => {
  it('passes release notes as data rather than shell source', () => {
    const step = steps.find((entry) => entry.name === 'Normalize release outputs');
    expect(step.env.OUTPUTS_JSON).toBe('${{ toJSON(steps.release.outputs) }}');
    expect(step.run).not.toContain('${{');
    const outputs = { release_created: 'true', body: "Preserve user's choice; $(exit 17) `exit 18`\nsecond line" };
    const target = path.join(fixture, 'outputs.json');
    const run = step.run.split('RELEASE_CREATED=')[0].replace('/tmp/release-please-outputs.json', target);
    const result = spawnSync('bash', ['-c', run], { env: { ...process.env, OUTPUTS_JSON: JSON.stringify(outputs) }, encoding: 'utf8' });
    expect(result.status, result.stderr).toBe(0);
    expect(JSON.parse(readFileSync(target, 'utf8'))).toEqual(outputs);
  });

  it('pins checkout and verification to the same automated/manual release metadata', () => {
    const checkout = steps.find((step) => step.name === 'Checkout release commit');
    const verify = steps.find((step) => step.name === 'Verify release source and version');
    expect(checkout.with.ref).toBe(releaseRef);
    expect(verify.env).toMatchObject({ RELEASE_SHA: releaseRef, RELEASE_TAG: releaseTag });
    expect(verify.if).toBe(checkout.if);
  });

  it('accepts matching source, tag and package version even when master has advanced', () => {
    // Only the checked-out release and tag matter; no mutable branch is resolved.
    const result = validate();
    expect(result.status, result.stderr).toBe(0);
  });

  it.each([
    ['checkout moved to another commit', { TEST_HEAD_SHA: 'b'.repeat(40) }],
    ['tag points to another commit', { TEST_TAG_SHA: 'b'.repeat(40) }],
    ['tag is missing', { TEST_TAG_SHA: '' }],
    ['package version differs from tag', { RELEASE_TAG: 'v1.2.4' }],
    ['release SHA is missing', { RELEASE_SHA: '' }],
    ['release tag is missing', { RELEASE_TAG: '' }],
  ])('rejects publication when %s', (_, overrides) => {
    expect(validate(overrides).status).not.toBe(0);
  });

  it('validates identity and runs tests/lint on that checkout before publish', () => {
    const index = (name) => steps.findIndex((step) => step.name === name);
    const verify = index('Verify release source and version');
    const validateStep = steps.find((step) => step.name === 'Validate release');
    expect(verify).toBeGreaterThan(index('Checkout release commit'));
    expect(verify).toBeLessThan(index('Install dependencies'));
    expect(validateStep.run).toContain('npm test');
    expect(validateStep.run).toContain('npm run lint:check');
    expect(validateStep.if).toBe(steps.find((step) => step.name === 'Checkout release commit').if);
    expect(index('Validate release')).toBeGreaterThan(index('Install dependencies'));
    expect(index('Validate release')).toBeLessThan(index('Publish package on NPM 📦'));
  });
});

describe('Pages deployment source', () => {
  const check = deploySteps.find((step) => step.id === 'deployment-version');

  it('sends the verified release checkout to the shared serialized Pages job', () => {
    const resolve = steps.find((step) => step.id === 'deploy-source');
    const releaseJob = workflow.jobs['release-please-pr'];
    const deployJob = workflow.jobs['deploy-release'];
    expect(resolve.run).toContain('git rev-parse HEAD');
    expect(releaseJob.outputs.deploy_sha).toBe('${{ steps.deploy-source.outputs.sha }}');
    expect(deployJob.uses).toBe('./.github/workflows/deploy-storybook.yml');
    expect(deployJob.with.release_sha).toBe('${{ needs.release-please-pr.outputs.deploy_sha }}');
    expect(deployment.jobs.deploy.concurrency).toEqual({ group: 'deploy-site', queue: 'max' });
    expect(deploySteps.find((step) => step.uses === 'actions/checkout@v4').with.ref).toContain('inputs.release_sha ||');
    expect(deploySteps.at(-2)).toBe(check);
    expect(deploySteps.at(-1).if).toContain("steps.deployment-version.outputs.current == 'true'");
    expect(deploySteps.at(-1).if).toContain("github.event_name == 'workflow_dispatch' && inputs.release_sha == ''");
  });

  it.each([
    ['exact version', '"1.2.3"', '0', '1', 0, 'current=true\n', '1'],
    ['newer version', '"1.2.10"', '0', '1', 0, '', '1'],
    ['older version then exact', '"1.2.3"', '0', '3', 0, 'current=true\n', '3'],
    ['older version then newer', '"1.2.4"', '0', '3', 0, '', '3'],
    ['persistently older version', '"1.2.2"', '0', '1', 1, '', '4'],
    ['registry failure', '{"error":"E503"}', '1', '1', 1, '', '1'],
    ['unexpected response', '["1.2.3"]', '0', '1', 1, '', '1'],
  ])('handles npm latest showing %s', (_, response, npmStatus, settlesAt, status, output, attempts) => {
    writeFileSync(path.join(fixture, 'package.json'), JSON.stringify({ name: 'vue-material-3', version: '1.2.3' }));
    const githubOutput = path.join(fixture, 'output');
    writeFileSync(githubOutput, '');
    const result = spawnSync('bash', ['-c', check.run], {
      cwd: fixture,
      env: {
        ...process.env,
        PATH: `${fixture}${path.delimiter}${process.env.PATH}`,
        NODE_PATH: semverModules,
        GITHUB_OUTPUT: githubOutput,
        TEST_NPM_RESPONSE: response,
        TEST_NPM_STATUS: npmStatus,
        TEST_NPM_SETTLES_AT: settlesAt,
      },
      encoding: 'utf8',
    });
    expect(result.status, result.stderr).toBe(status);
    expect(readFileSync(githubOutput, 'utf8')).toBe(output);
    expect(readFileSync(path.join(fixture, 'npm-attempt'), 'utf8').trim()).toBe(attempts);
  });
});
