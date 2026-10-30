# Official M3 guideline verification — 28 October 2026

The five new components were compared with the live official site in a JavaScript-capable browser. The plain web fetch returns only a JavaScript requirement; the rendered guideline text was read directly. This is a scoped implementation review, not a claim of complete current M3/Expressive coverage.

| Component | Official reference | Verified behavior / correction |
| --- | --- | --- |
| BottomSheet | [Guidelines](https://m3.material.io/components/bottom-sheets/guidelines), [Specs](https://m3.material.io/components/bottom-sheets/specs) | Modal blocks background; standard remains interactive. Initial modal height capped at half the viewport. Accessible handle toggles two heights; upward drag expands and downward drag collapses/dismisses. Expanded top margin is 72px compact / 56px wide; wide side margins are 56px, width capped at 640px. Internal content scrolls independently. |
| SideSheet | [Guidelines](https://m3.material.io/components/side-sheets/guidelines), [Specs](https://m3.material.io/components/side-sheets/specs) | Logical trailing edge mirrors in RTL; modal/standard behaviors remain distinct. Horizontal scrolling suppressed; long text wraps. Standard surface role corrected to surface; modal remains surface-container-low. Footer actions use logical start and 24px bottom padding. |
| Carousel | [Guidelines](https://m3.material.io/components/carousel/guidelines) | Equal-size uncontained layout, with supported snapping, native touch scrolling, accessible controls and a vertical Show all alternative. Other standard M3 carousel layouts are not advertised as implemented or incorrectly classified as Expressive-only. |
| NavigationRail | [Guidelines](https://m3.material.io/components/navigation-rail/guidelines) | Baseline compact rail, single current destination, badges, labels and keyboard focus. Ripple now listens to the actual destination button, including label/padding presses. Selected Material Symbols use filled glyph variation. Application owns placement/breakpoint choice and routing. |
| TopAppBar | [Guidelines](https://m3.material.io/components/app-bars/guidelines) | Full-width baseline variants, straight corners, named actions, RTL and contrasting surface role on scroll. Corrected centered-title overlap with two actions on a narrow screen. Current flexible/search variants are explicitly outside the implemented baseline. |

## Confirmed gaps fixed in this pass

1. Bottom sheet lacked a selectable/keyboard-accessible height control and initially grew beyond the modal half-height guideline. It now exposes a real button and two height presets, with regression tests and native browser height assertions.
2. Bottom sheet expanded margins did not match the official compact/wide measurements. Defaults now use the documented margins; explicit application overrides remain supported.
3. Side sheet shared generic `overflow:auto`, allowing forbidden horizontal scrolling. It now scrolls vertically, wraps text and suppresses horizontal overflow. Its standard color/footer alignment now follow the side-sheet specs.
4. Carousel lacked an alternate way to view every item without horizontal scrolling. A reversible vertical Show all view now provides it; names are configurable.
5. Rail ripple listened to a non-focusable child span, missing focus and presses on destination labels. It now listens to the button, while painting within the indicator. Selected glyphs now use `FILL=1`.
6. Centered app-bar title overlapped two actions in a 360px layout. Intrinsic side-track minimum widths prevent overlap; native browser geometry asserts separation.

## Explicit scope limits

- The official site now recommends flexible medium/large app bars and the current expanded/collapsed rail. Existing baseline variants do not equal complete current Expressive support; replacing them is a separate API/product change.
- The carousel implements only uncontained layout, not multi-browse, hero or full-screen. Those are M3 layouts too.
- Android predictive-back animations are platform-specific and not implemented by these web components.
- Arbitrary bottom-sheet detents and fling physics are not provided. The implemented two-position handle has both single-pointer and keyboard alternatives.
- Consumers still choose the correct navigation surface at each breakpoint and provide meaningful destination/action names, image alternatives and appropriate slotted content.

Validation commands: `npm test`, `npm run lint:check`, `npm run build`, `npm run docs:build`, `npm run build-storybook`, `npm run test:browser`, `npm run test:visual`, and `npm run test:package`. Actual final results are recorded after execution; no dependency installation, commit, push or publication is part of this check.

## Source locations

- `src/components/sheet/MdSheet.vue:64`
- `src/components/sheet/MdSheet.vue:296`
- `src/components/carousel/MdCarousel.vue:60`
- `src/components/navigation-rail/MdNavigationRail.vue:117`
- `src/components/top-app-bar/MdTopAppBar.vue:137`

## Final validation

- `npm test`: **369/369 passed** (41 files).
- `npm run test:browser`: **14 scenario groups passed** in Chrome 156, including modal height expansion, vertical Show all, selected rail icon state and narrow app-bar action separation.
- `npm run test:visual`: existing geometry/style baselines passed **without updating**. Screenshots remain manual-review artifacts, not pixel-difference tests.
- `npm run build`, `npm run docs:build`, `npm run build-storybook`: passed.
- `npm run test:package`: packed ES/UMD/CSS exports and styled browser consumer passed.
- `npm run lint:check`: **0 errors, 129 warnings**. Existing Sass deprecation / bundle warnings remain; no clean-warning claim is made.
- `git diff --check`: passed. No new dependency, commit, push or publication.

Source receipt: base HEAD `9b106e935021e52595d4c83005fc092e8232cca8`, plus uncommitted source snapshot SHA-256 `13dda4c2bab05eb723680933055c26383c425ad41c47c25b052babf6644b4bf2` (362 tracked/non-ignored files; sorted path + NUL + byte length + NUL + contents; both review reports and ignored build artifacts excluded).
