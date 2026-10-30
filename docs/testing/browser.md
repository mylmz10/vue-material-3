# Browser and package checks

Use Node 22 and the existing installed dependencies. No additional test package or browser download is needed. Set `CHROME_BIN` to a Chrome/Chromium executable if it is not in a supported system location. The runner launches an isolated temporary profile and deletes it afterward. It never connects to your normal browser.

```sh
npm run test:browser
npm run test:visual
npm run test:package
```

`test:browser` starts Vite on localhost and sends native keyboard, mouse and touch input through Chrome's debugging protocol. Assertions cover modal focus isolation/restoration, hidden/disabled targets, nested dialogs, drawer Escape, autocomplete input focus, select boundaries, submenu navigation, controlled values, radio groups, ripple release, fields, picker gestures and removal/unmount. Unit tests cover cancellation, registration and listener/timer cleanup where browser assertions alone cannot prove it.

`test:visual` compares deterministic geometry and computed-style samples against `tests/browser/visual-baseline.json`. It saves full-page PNGs for light/dark, RTL/narrow, enlarged field/button text and disabled/loading states in `test-results/browser/`. CI uploads these files for visual review. **This is a geometry/style regression check plus screenshot review, not pixel-difference testing.** Borders, shadows, glyph rendering and unsampled positions require human review. System fonts deliberately avoid network font dependencies. The font prerequisites below must be checked in the consuming application too.

After reviewing a deliberate change, update measured baselines with:

```sh
npm run test:visual -- --update
```

Review both JSON changes and PNG artifacts. Chrome reports its version in the log. Browser rendering can change when CI's preinstalled Chrome updates; inspect baseline failures instead of automatically accepting them. Tests do not claim Firefox/WebKit, screen-reader or physical-device coverage. Fixture text enlargement is a layout stress check, not a substitute for OS/browser 200% zoom testing.

`test:package` builds and packs the actual artifact into a temporary directory, checks its public UMD/ES/CSS paths and Vue peer metadata, builds a consumer using only package imports, and renders it in Chrome to assert its CSS and components. It reuses already installed Vue/dayjs through symlinks; it never runs `npm install` or publishes. Missing Vue is declared as a required peer, and the compatibility range excludes Vue 3.4 because components use Vue 3.5 `useId`. It checks metadata and a supported installed runtime, not npm's resolver in every npm version.

## Storybook prerequisites

Package consumers must import `vue-material-3/style.css` once. Roboto and Material Symbols Outlined are external font prerequisites: load them in the application, or supply your own typography/icon content. Storybook's preview config supplies fonts for the examples; they are not bundled into the package.

Existing field/select/autocomplete stories feed emitted model values back into a parent ref, and watch incoming controls so Storybook updates also reach the parent. Use Controls for supported disabled, readonly and error states; use a `.dark` container for dark tokens. `modelValue` takes precedence over a legacy `value`; select's `value` is an initial default, while text-field legacy `value` stays reactive only when `modelValue` is absent. See each component page for props, emits and slots.
