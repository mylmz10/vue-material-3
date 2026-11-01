# API Reference

Public components are exported from `vue-material-3`. Each component reference documents its main props, events, slots, and interaction behavior alongside a working example.

## Imports

Import the components you use and load the compiled stylesheet once:

```js
import { MdElevatedButton, MdOutlinedTextField } from 'vue-material-3';
import 'vue-material-3/style.css';
```

Typography and icon fonts are application prerequisites. Follow [Installation](/guide/installation) to load them.

## Component reference

| Group                                            | Components                                                                                      |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| [Autocomplete](/components/autocomplete)         | `MdFilledAutoComplete`, `MdOutlinedAutoComplete`                                                |
| [Avatar](/components/avatar)                     | `MdAvatar`                                                                                      |
| [Badge](/components/badge)                       | `MdBadge`                                                                                       |
| [Bottom Sheet](/components/bottom-sheet)         | `MdBottomSheet`                                                                                 |
| [Button](/components/button)                     | `MdElevatedButton`, `MdFilledButton`, `MdFilledTonalButton`, `MdOutlinedButton`, `MdTextButton` |
| [Card](/components/card)                         | `MdCard`                                                                                        |
| [Carousel](/components/carousel)                 | `MdCarousel`                                                                                    |
| [Checkbox](/components/checkbox)                 | `MdCheckbox`                                                                                    |
| [Chips](/components/chips)                       | `MdChip`, `MdAssistChip`, `MdChipSet`, `MdFilterChip`, `MdInputChip`, `MdSuggestionChip`        |
| [Date Picker](/components/date-picker)           | `MdFilledDatePickerField`, `MdOutlinedDatePickerField`, `MdDatePicker`                          |
| [Dialog](/components/dialog)                     | `MdDialog`                                                                                      |
| [Divider](/components/divider)                   | `MdDivider`                                                                                     |
| [FAB](/components/fab)                           | `MdFab`, `MdBrandedFab`, `MdFabExtended`                                                        |
| [Icon Button](/components/icon-button)           | `MdIconButton`                                                                                  |
| [Icon](/components/icon)                         | `MdIcon`                                                                                        |
| [List](/components/list)                         | `MdList`, `MdListItem`, `MdListDivider`                                                         |
| [Menu](/components/menu)                         | `MdMenu`, `MdMenuItem`, `MdSubMenu`                                                             |
| [Navigation Rail](/components/navigation-rail)   | `MdNavigationRail`                                                                              |
| [Navigation](/components/navigation)             | `MdNavigationBar`, `MdNavigationDrawer`, `MdNavigationTab`                                      |
| [Progress](/components/progress)                 | `MdLinearProgressIndicator`, `MdCircularProgressIndicator`                                      |
| [Radio](/components/radio)                       | `MdRadio`                                                                                       |
| [Search](/components/search)                     | `MdSearch`                                                                                      |
| [Segmented Button](/components/segmented-button) | `MdSegmentedButton`, `MdSegmentedButtonSet`                                                     |
| [Select](/components/select)                     | `MdFilledSelect`, `MdOutlinedSelect`, `MdSelectOption`                                          |
| [Side Sheet](/components/side-sheet)             | `MdSideSheet`                                                                                   |
| [Slider](/components/slider)                     | `MdSlider`                                                                                      |
| [Snackbar](/components/snackbar)                 | `MdSnackbar`                                                                                    |
| [Switch](/components/switch)                     | `MdSwitch`                                                                                      |
| [Tabs](/components/tabs)                         | `MdTabs`, `MdPrimaryTab`, `MdSecondaryTab`                                                      |
| [Text Field](/components/text-field)             | `MdFilledTextField`, `MdOutlinedTextField`                                                      |
| [Time Picker](/components/time-picker)           | `MdFilledTimePickerField`, `MdOutlinedTimePickerField`, `MdTimePicker`                          |
| [Tooltip](/components/tooltip)                   | `MdTooltip`                                                                                     |
| [Top App Bar](/components/top-app-bar)           | `MdTopAppBar`                                                                                   |

## Conventions

### Props and models

Use kebab-case attributes in templates (`supporting-text`) for camelCase props (`supportingText`). Components with a `modelValue` prop use `v-model`; named models include `v-model:selected` on icon buttons and chips, and `v-model:open` on standalone date/time pickers.

Selection shapes vary: navigation and tabs use indices, selects use option values, and range sliders emit `{ valueStart, valueEnd }`. The navigation drawer uses `:opened` and `@change` rather than `v-model`. See each reference for its exact contract.

### Events and slots

Bind events with `@event-name` and slots with `#slot-name`. Scoped slots such as sheet footers expose helpers:

```vue
<template #footer="{ close }">
  <MdTextButton label="Done" @click="close('done')" />
</template>
```

The parent owns controlled state and must accept emitted updates. Slot helpers and emitted payloads are documented per component.

### Styling

The compiled CSS includes theme variables and component styles. Use the supported theme selectors and CSS custom properties described in [Theming](/guide/theming); repository SCSS sources are not package entry points.

## Related documentation

- [Components](/components/)
- [Quick Start](/guide/quick-start)
- [Migration Notes](/migration/)
- [Storybook](https://mylmz10.github.io/vue-material-3/storybook/)
