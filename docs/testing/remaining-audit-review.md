# Remaining audit tasks and final review

> This records the initial completion pass. The subsequent [official M3 guideline verification](./m3-guideline-verification.md) adds corrections and newer validation results; its source receipt supersedes the one below.

What this change does: It completes the 11 remaining To Do items without adding a dependency. It adds five standard M3 components, reproducible browser/package checks and fixes confirmed issues in the remaining audit paths. No commit, push or publication was performed.

## Task receipt

| Card | Result | Evidence |
| --- | --- | --- |
| 24 Vue peer runtime | Required `vue: ^3.5.0`; existing development runtime retained | `package.json`, lock metadata, package consumer test excludes 3.4 |
| 25 Browser integration | Native Chrome keyboard/mouse/touch suite; 13 scenario groups | `npm run test:browser`; unit tests cover listener/timer cleanup and registration |
| 26 Themes and visuals | Light/dark, narrow RTL, actual enlarged field/button text, disabled/error/focus states, reduced motion and measured targets/contrast | `npm run test:visual`; geometry/style JSON baseline and reviewed PNGs |
| 27 Packaged consumer | Pack tarball, public UMD/ES/CSS imports, exports, files, peer metadata and actual styled rendered consumer | `npm run test:package`; no install or publish |
| 28 Storybook models/states | Existing field/select/autocomplete stories feed models back and follow Controls; docs explain CSS/fonts and supported states | Storybook build; existing variants extended rather than extra object-value stories |
| 30 BottomSheet | Controlled modal/standard sheet, shared dialog foundation, scroll bounds, naming, focus and drag dismissal | Sheet unit tests; real Chrome modality/scroll/focus tests; in-app browser inspection |
| 31 Carousel | Native scroll/snap, controlled index, scoped item slot, keyboard, RTL, responsive dimensions, cleanup | Carousel unit tests and native browser selection; no Expressive masking claim |
| 32 NavigationRail | Standard compact 80px rail, controlled index, labels/badges, disabled destinations and keyboard focus | Rail unit tests and native keyboard/selection browser check |
| 33 SideSheet | Standard/modal, logical edges, controlled visibility, header/content/actions and focus lifecycle | Sheet unit tests; real Chrome modal/RTL/scroll checks |
| 34 TopAppBar | Four baseline variants, named actions/navigation, long titles, optional collapsing scroll behavior and cleanup | App bar unit tests and responsive screenshots |
| 35 Remaining investigations | All eight native checklist investigations traced; confirmed bugs fixed; extra audit paths checked below | Unit/browser evidence and source disposition table |

The separate project-wide Material revision/Expressive decision card is not treated as approved. The added components use the scope documented in [Material baseline](../guide/material-baseline.md).

## Confirmed implementation defects fixed

These cases were confirmed from connected source or tests. Existing defects found while completing card 35 are included separately from review findings below.

| Problem and concrete case | Minimal change and expected behavior | Regression evidence |
| --- | --- | --- |
| `MdRadio`: controlled value `a` becomes `b` while model stays `a`; old watcher leaves it checked | Watch both model and value; native/visual state becomes unchecked | `RemainingAudit.spec.js`: value change |
| Native same-name radio selection unchecks its sibling without sending sibling `change`; old visual state stays selected | Capture document change, filter by native group/form/root, sync checked state; cleanup on unmount | Same-form/different-form test with ancestor `@change.stop`; native Chrome group check |
| Ripple released outside host remains pressed; delayed release and animation survive teardown | Pointer release/cancel capture during press, window blur release, timer/animation cleanup | Focused fake-timer regression and native outside release |
| A control changes its `form` prop after mount; reset still targets old form | Capture reset once on owner document, check current native `.form`, honor cancellation and cancel scheduled work after unmount | Five control variants, old/new form, canceled reset and unmount tests |
| Select Home/End calls selection-preferring initialization and stops on selected middle option | Explicit first/last enabled option selection | Filled/outlined unit regressions and native Chrome Home/End |
| Select `aria-activedescendant` names an option token that exists only as `data-option-id` | Give option its matching DOM ID | Filled/outlined ID resolution tests and native browser assertion |
| Progress accepts negative, >100 and invalid values into visual percentages/ARIA | Clamp numeric values consistently for semantics and paint; remove determinate value in indeterminate mode | Both progress variants, -20/140/invalid and mode transition tests |
| Decorative icon ligature words become part of names; date header actions have no meaningful explicit name | Hide decorative icons by default; meaningful standalone named icons expose image role; name date navigation actions | Icon and date header name tests; browser accessibility tree |
| Search `name`, `id`, `required` and accessible naming land on wrapper rather than input | Forward control attributes; explicitly name search/clear/voice actions | Search attribute and parent-model test |
| Tabs register one child at a time and emit a premature model correction from initial index 2 to index 1 | Batch corrective synchronization after registration settles | Parent ref feedback test with third tab initially selected |
| Keyed tab reorder changes DOM order but navigation uses old registry order | Synchronize registry to DOM order; retain uncontrolled selected identity | Keyed reorder and keyboard regression |
| Clicking a slotted button inside interactive card also emits card click and can navigate away | Ignore nested interactive controls/default-prevented activation in interactive cards | Nested button/link/control regression and retained card activation tests |
| `MdChipSet` drops symbol VNodes, including compiled `v-for` Fragment, so all chips disappear | Recursively flatten Fragment children while excluding comments | Compiled-template v-for/removal test; real browser chip removal |
| Action/input/mixed chip sets force every child to option/listbox semantics | Pure filter selections use listbox; mixed/action/input sets use group and appropriate child action/toggle semantics | Pure-filter and mixed group tests, including disabled navigation |
| Chip root/removal and dial number targets are smaller than the 48px baseline | Keep chip visual surface at 32px inside a 48px target; enlarge remove action and dial labels | Actual browser target geometry assertions; ripple surface stays within visual chip |

## Current source locations

- Radio model/value and group synchronization: `src/components/radio/MdRadio.vue:54`.
- Ripple lifecycle: `src/components/ripple/MdRipple.vue:56`.
- Current form owner and canceled reset: `src/composables/useFormReset.js:4`.
- Select Home/End: `src/components/select/MdFilledSelect.vue:423`.
- Outlined select Home/End: `src/components/select/MdOutlinedSelect.vue:423`.
- Option DOM identity: `src/components/select/MdSelectOption.vue:10`.
- Linear value bounds: `src/components/progress-indicator/MdLinearProgressIndicator.vue:31`.
- Circular value bounds: `src/components/progress-indicator/MdCircularProgressIndicator.vue:18`.
- Decorative icon semantics: `src/components/icon/MdIcon.vue:3`.
- Search control forwarding: `src/components/search/MdSearch.vue:8`.
- Tab registration and order: `src/components/tabs/MdTabs.vue:93`.
- Nested card activation: `src/components/card/MdCard.vue:82`.
- Chip fragments: `src/components/chips/MdChipSet.vue:68`.
- Mixed chip semantics: `src/components/chips/MdChip.vue:112`.
- Chip target: `src/components/chips/MdChip.vue:273`.
- Dial target: `src/components/timepicker/MdTimePickerDial.vue:250`.

## Independent review findings — fixed

### Must fix

1. **A standard sheet closes its parent dialog on Escape** (`src/components/sheet/MdSheet.vue:80`).
   - **What this is:** A standard sheet can sit inside a modal dialog.
   - **Problem:** Ignoring any dialog ancestor skips sheet dismissal and closes the parent instead. The runtime reproduction left the sheet open while the parent closed.
   - **Fix:** Compare the target's closest dialog with the sheet surface's closest dialog. Ignore only a descendant modal; tests cover both wrappers nested inside a dialog.
   - **If we skip it:** Escape dismisses the wrong surface and loses the surrounding task.

2. **Radio visuals depend on consumer event propagation** (`src/components/radio/MdRadio.vue:74`).
   - **What this is:** Native radios uncheck other radios without a second change event.
   - **Problem:** An ancestor `@change.stop` prevented the new document bubble listener from synchronizing the unchecked sibling.
   - **Fix:** Listen in capture phase and use the same phase for cleanup. A real SFC regression with stopped propagation passes.
   - **If we skip it:** A group can visibly show two selected radios while submitting one.

3. **A controlled carousel acknowledgement stops native momentum** (`src/components/carousel/MdCarousel.vue:98`).
   - **What this is:** Scrolling updates the parent index, which feeds it back through v-model.
   - **Problem:** Treating that feedback as an independent request scrolls instantly again and interrupts native motion.
   - **Fix:** Recognize the emitted index acknowledgement. External selection still aligns the item; a focused regression checks both paths.
   - **If we skip it:** Touch/trackpad browsing feels interrupted under normal controlled use.

### Should fix

4. **Enlarging the chip target also enlarges its ripple** (`src/components/chips/MdChip.vue:282`).
   - **What this is:** The interaction target is 48px while the visible chip remains 32px.
   - **Problem:** The old ripple still filled the whole target and could paint outside the visual outline.
   - **Fix:** Give the direct ripple the same 8px block inset as the visual background/outline. Remove overridden padding.
   - **If we skip it:** Hover/press paints an inconsistent chip shape.

5. **Root font scaling did not test fixed-pixel component text** (`tests/browser/run.mjs:192`).
   - **What this is:** The fixture checks enlarged text and narrow layout.
   - **Problem:** Changing only root font size leaves fixed-pixel field/button text unchanged.
   - **Fix:** Enlarge actual fixture text and assert the field's computed font size is 32px. Document that this is not OS/browser zoom coverage.
   - **If we skip it:** The test name promises a text-enlargement check that never happened.

6. **Screenshot capture was too easy to mistake for image regression testing** (`docs/testing/browser.md`, visual runner).
   - **What this is:** The suite records PNGs and compares sampled styles/geometry.
   - **Problem:** It does not compare image pixels; unsampled shadows, glyphs or borders could change without a failing assertion.
   - **Fix:** Explicitly document automated geometry/style scope and manual PNG review. Do not claim pixel regression or full visual conformance.
   - **If we skip it:** Maintainers overestimate the automated protection.

7. **The outside-release test title claimed active-press unmount coverage** (`tests/browser/run.mjs:145`).
   - **What this is:** Browser checks release outside the host; unit tests check timers/listeners on teardown.
   - **Problem:** The browser scenario released first, so it did not itself prove cleanup during an active press.
   - **Fix:** Narrow the browser claim and retain the dedicated active-press/timer/animation unmount unit regression.
   - **If we skip it:** Test reports imply evidence the specific scenario does not provide.

8. **Fixture server connections could keep a successful test process alive** (`tests/browser/run.mjs:240`).
   - **What this is:** The suite owns a temporary Vite server and browser.
   - **Problem:** An open HMR/keep-alive connection delayed server shutdown after assertions passed, which could stall CI.
   - **Fix:** Disable unnecessary HMR/watch in this test server and close its HTTP connections during cleanup. The final command is checked for a zero exit status, not only PASS lines.
   - **If we skip it:** CI can wait on a finished test suite.

## Card 35 investigation dispositions

| Checklist / related path | Disposition |
| --- | --- |
| Uncontrolled same-name radio, dynamic value | Confirmed and fixed; native Chrome and unit regressions |
| Ripple release/cancel/unmount | Confirmed and fixed; native mouse outside release, unit pointer cancel/timer/animation teardown |
| Select boundaries and active descendant | Two confirmed defects fixed in both variants; actual DOM ID resolution asserted |
| Dynamic form reassociation | Confirmed and fixed across radio/checkbox/switch/fields/select; current native owner used at event time |
| Navigation selected/current semantics | Existing navigation tab lacked current state; `aria-current=page` added. Rail uses current destination state too |
| Progress values/mode transitions | Confirmed out-of-range defects fixed and covered for both variants |
| Chip/time-dial targets | Measured in browser; roots/removal/dial labels meet implemented 48px baseline; visuals retained |
| Icon names | Decorative ligatures hidden; internal icon-only search/date/new app-bar/sheet actions explicitly named. Consumers must still name their own icon-only controls |
| Field disabled/readonly/error/required/model behavior | Existing focused tests retained, reset coverage expanded, native edit blocking and required select proxy paths covered |
| Dynamic tab registration | Initial parent feedback and keyed reorder defects fixed; removal/disabled tests retained |
| Mixed chip set semantics | Confirmed and fixed; pure filter selection remains option/listbox |
| Nested card controls | Confirmed and fixed with slotted control regression |
| Search input forwarding | Confirmed and fixed; required/name/id/ARIA reach native input |
| Dial/picker boundaries | Existing picker parser/disabled/readonly field tests retained; native dial drag/cancel checked at actual dial size |
| TypeScript declarations / avatar fallback | Optional API/product additions; no extra implementation or M3 violation claimed |

## Measured browser results

Normal foreground/background text contrast: **16.23:1 light**, **14.35:1 dark**. Chip root, removal button and time-dial number targets: **48px high** in every fixture. These measurements do not establish contrast for every token pair or target sizes for every component. Carousel final-item alignment and native touch swipes were additionally checked in both LTR and RTL; the suspected boundary regression was not reproduced and was not reported as a bug.

## Validation and limits

- Node 22; existing dependencies only. Vue peer metadata changes do not install a package.
- Unit tests: **364/364 passed** on the final integrated component source.
- Native Chrome 156: 13 browser scenario groups passing.
- Packaged consumer: UMD exports, ES consumer build, CSS resolution, peer range and actual styled button/carousel rendering passed.
- Library, VitePress documentation and Storybook builds passed. Lint: **0 errors, 129 warnings**. Sass deprecation and existing bundle-size warnings remain visible.
- Browser geometry/style baseline passed again **without update**. Screenshots are stored in ignored `test-results/browser/`; CI uploads them.
- GitHub Actions steps were configured and locally exercised; no remote GitHub run or release was triggered.
- No screen reader, Firefox/WebKit, physical-device or pixel-difference test was performed. Font downloads are deliberately absent from deterministic fixtures; Roboto/Material Symbols remain consuming-app prerequisites, so fixture screenshots show fallback glyphs where those fonts are unavailable.
- Ruflo guidance was attempted but its transport was closed. Actual independent Codex workers ran in three isolated worktrees. Root alone integrated shared files; no coordination state was added to the source tree.

Verdict: Ship. No open confirmed finding remains in this change's reviewed scope.

## Source-state receipt

Base HEAD: `9b106e935021e52595d4c83005fc092e8232cca8`. No new commit.

Working-source SHA-256: `c5599da6184553eb19b6916ee50c51a9a35e85225df9989ff66fd1067b81fb95` (362 tracked/non-ignored files, sorted path + NUL + byte length + NUL + file bytes; this review document excluded to avoid a self-reference). Build artifacts and screenshots are ignored and excluded. Validation is bound to this working source, not HEAD alone.
