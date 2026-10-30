# Navigation rail

`MdNavigationRail` implements the standard compact Material 3 rail: an 80px column for primary destinations on larger screens. Use the navigation bar instead on compact screens; the host application chooses its breakpoint. This component does not implement Expressive expanded rails.

```vue
<MdNavigationRail v-model="destination" :items="[
  { label: 'Home', icon: 'home', activeIcon: 'home' },
  { label: 'Inbox', icon: 'mail', badge: 3, badgeLabel: '3 unread messages' },
]" />
```

`modelValue` is the selected item index, matching `MdNavigationBar`. Selection is controlled: handle `update:modelValue` or use `v-model`. Items accept `label`, `icon`, `activeIcon`, `disabled`, `badge` (number/string, or `true` for a dot), and `badgeLabel` for an accessible badge description. Supply a meaningful label for every destination. `labels` accepts `all` (default), `selected`, or `none`; hidden labels remain accessible. `ariaLabel` names the navigation landmark.

Up/Down wrap through enabled destinations; Home/End focus the first/last. Moving focus does not change selection. Enter/Space activate native destination buttons. Header and footer slots accommodate a menu button or FAB and additional content; provide accessible names on slotted controls.

Reference: [Material navigation rail](https://m3.material.io/components/navigation-rail/overview). Geometry follows the repository's standard M3 tokens, not Expressive dimensions.
