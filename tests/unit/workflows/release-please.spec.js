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
const releaseRef = '${{ steps.release-meta.outputs.sha || steps.manual-release.outputs.sha }}';
const releaseTag = '${{ steps.release-meta.outputs.tag_name || steps.manual-release.outputs.tag_name }}';
const sha = 'a'.repeat(40);
let fixture;

beforeEach(() => {
  fixture = mkdtempSync(path.join(tmpdir(), 'release-check-'));
  writeFileSync(path.join(fixture, 'package.json'), JSON.stringify({ version: '1.2.3' }));
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
