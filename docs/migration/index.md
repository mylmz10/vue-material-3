# Migration Notes

Use this checklist when upgrading the package. The project is pre-1.0, so review the release's changelog before updating. These are current compatibility requirements, not a version-specific breaking-change history.

## Runtime and assets

- Use Vue `^3.5.0`; components use Vue 3.5 APIs.
- Import `vue-material-3/style.css` once. Component imports do not load CSS.
- Load Roboto, Material Symbols Outlined, and legacy Material Icons, or self-host equivalent fonts.

See [Installation](/guide/installation) for setup examples.

## Models and forms

Use `v-model` for reactive parent-owned state. Text fields and selects retain legacy `value` support with different semantics: text-field `value` remains reactive when no model is supplied, while select `value` supplies the initial selection and reset baseline.

For range sliders, the model is `{ valueStart, valueEnd }`. Standalone date/time picker visibility is a separate `v-model:open`. Navigation drawers use `:opened` with `@change`.

Check the relevant component's API before changing existing bindings. Preserve accessible names and form labels when updating templates.

## Verify the upgrade

Exercise the states your application uses: disabled and readonly fields, validation, keyboard navigation, modal dismissal, and both color schemes. For changes to this repository, follow [Browser and Package Checks](/testing/browser).

## Related documentation

- [Components](/components/)
- [API Reference](/api/)
- [Theming](/guide/theming)
- [Storybook](https://mylmz10.github.io/vue-material-3/storybook/)
