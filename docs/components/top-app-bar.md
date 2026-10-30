# Top app bar

`MdTopAppBar` supports the standard Material 3 `small`, `center-aligned`, `medium`, and `large` variants (64/64/112/152px). These are the repository's baseline M3 variants, not the newer Expressive flexible app bars.

```vue
<MdTopAppBar title="Library" navigation-icon="menu" navigation-label="Open menu"
  :actions="[{ icon: 'search', label: 'Search library' }]"
  variant="large" scroll-behavior="collapse" @navigation="openMenu" @action="handleAction" />
```

The title renders as an `h1`, truncates long text within available space, and remains available through its text/title attribute. Navigation and actions use non-submitting icon buttons. Every action requires a meaningful `label`; `navigationLabel` defaults to “Open navigation”. Actions accept `icon`, `label`, and `disabled`. The `action` event supplies `(action, index, event)`; `navigation` supplies the click event. The `title`, `navigation`, and `actions` slots replace their respective default content; name slotted icon controls yourself.

The bar is sticky at the top of its containing scroll area. `scrollBehavior="pinned"` (default) preserves its height and applies a surface fill when scrolled. `collapse` reduces medium/large bars to 64px as content scrolls. `scrollTarget` accepts a DOM element or selector; omitted, it observes the window. Set it to the containing scroll element when using an overflow panel. Dynamic targets are rebound and listeners are removed on unmount. Selector targets must exist when mounted or when the prop changes.

Reference: [Material app bars](https://m3.material.io/components/app-bars/overview).
