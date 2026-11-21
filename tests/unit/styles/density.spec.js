import { readFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { compileString } from 'sass';
import { describe, expect, it } from 'vitest';

const source = path.resolve('src/styles/density/_density.scss');

function compile() {
  return compileString(
    `@use ${JSON.stringify(source)} as density;
.button { @include density.height(40px, 28px); }
.chip { height: density.size(32px, 24px); }
.outer { height: density.size(48px, 36px); }`,
    { url: pathToFileURL(path.resolve('tests/unit/styles/density-input.scss')) }
  ).css;
}

function compileVueStyle(file) {
  const style = readFileSync(file, 'utf8').match(/<style lang="scss">([\s\S]*?)<\/style>/)[1];
  return compileString(style, {
    url: pathToFileURL(file.replace(/\.vue$/, '.scss')),
    quietDeps: true,
    silenceDeprecations: ['if-function', 'global-builtin'],
  }).css;
}

function height(declaration, scale) {
  const match = declaration.match(/max\(([-\d.]+)px, calc\(([-\d.]+)px \+ var\(--_md-density-scale\) \* 4px\)\)/);
  if (!match) throw new Error(`Unexpected density declaration: ${declaration}`);
  const clamped = Math.min(0, Math.max(-3, scale));
  return Math.max(Number(match[1]), Number(match[2]) + clamped * 4);
}

describe('density scale', () => {
  const css = compile();
  const rule = (selector) => css.match(new RegExp(`${selector}\\s*\\{([^}]+)\\}`))[1];

  it('keeps the default height and removes 4px per step', () => {
    expect(css).toContain('--_md-density-scale: clamp(-3, var(--md-sys-density-scale, 0), 0)');
    const button = rule('.button');
    expect(height(button, 0)).toBe(40);
    expect(height(button, -2)).toBe(32);
    expect(height(button, 2)).toBe(40);
  });

  it('stops a chip at its minimum instead of shrinking without a floor', () => {
    expect(height(rule('.chip'), 0)).toBe(32);
    expect(height(rule('.chip'), -3)).toBe(24);
    expect(height(rule('.outer'), -3)).toBe(36);
  });

  it('moves the filled label with the field height', () => {
    const field = compileVueStyle(path.resolve('src/components/field/MdField.vue'));
    expect(field).toContain('--md-field-density-shift: calc((var(--md-field-container-height) - 56px) / 2)');
    expect(field).toContain('transform: translateY(calc(-13px - var(--md-field-density-shift)))');
  });

  it('keeps drawer rows and autocomplete options at the default size', () => {
    const drawer = compileVueStyle(path.resolve('src/components/navigation-drawer/MdNavigationDrawer.vue'));
    const popup = compileVueStyle(path.resolve('src/components/autocomplete/MdAutocompletePopup.vue'));
    const dialog = compileVueStyle(path.resolve('src/components/autocomplete/MdAutoCompleteBase.vue'));
    expect(drawer).toMatch(/\.md-navigation-drawer\s*\{[^}]*--md-sys-density-scale:\s*0/);
    expect(popup).toMatch(/\.md-autocomplete-popup \.md-list\s*\{[^}]*--md-sys-density-scale:\s*0/);
    expect(dialog).toMatch(/\.md-autocomplete__dialog \.md-list\s*\{[^}]*--md-sys-density-scale:\s*0/);
  });
});
