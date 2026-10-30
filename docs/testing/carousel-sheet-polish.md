# Carousel and sheet interaction follow-up

This follow-up supersedes the motion assessment in the earlier guideline receipt. Existing audit work remains uncommitted.

## Changes

- Carousel arrow, keyboard and external model navigation use native smooth scrolling. Layout correction stays instant. Built-in images use bounded parallax.
- Live reduced-motion preference disables smooth scrolling and image movement. Pointer/wheel input interrupts pending motion. Intermediate frames do not change the requested model.
- Delayed controlled acceptance after rollback or interruption is covered by two regression cases; the stale acknowledgement found during independent review was fixed.
- Carousel controls reuse Material icon/text buttons. Sheet close controls reuse Material icon buttons. Bottom/side sheet stories use Material action buttons and a realistic content flow.
- Sheet entrance, exit and preset-height motion use existing M3 duration/easing tokens and honor reduced motion.
- Existing Storybook examples were refined with local SVG artwork, Material lists and functioning save/close actions. No new dependency was added.

## Verification

- Unit tests: 376 passed, 41 files.
- Browser tests: 15 scenario groups passed, including observed intermediate native scroll frames and live reduced motion.
- Visual geometry/style baseline checks passed without baseline changes; screenshots are manual review artifacts, not pixel-difference tests.
- Library build, documentation build, Storybook build and packed ES/UMD/CSS consumer checks passed.
- Lint: 0 errors, 129 warnings. Existing Sass deprecation and bundle warnings remain.
- Manual Storybook review: carousel navigation, sheet expansion, save action, dismissal and launcher focus restoration verified.
- Independent read-only review found the controlled acceptance issue above; no further confirmed defect in this follow-up.

Scope remains the documented uncontained carousel and current sheet APIs. This does not claim implementation of all M3 Expressive carousel layouts. Base HEAD: `9b106e935021e52595d4c83005fc092e8232cca8`. No commit or push.
