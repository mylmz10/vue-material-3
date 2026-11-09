export const autocompleteProps = {
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  modelValue: { type: [String, Number, Boolean, Object], default: null },
  label: { type: String, default: null },
  items: { type: Array, default: () => [] },
  mode: { type: String, default: 'docked', validator: (value) => ['docked', 'modal'].includes(value) },
  clearable: { type: Boolean, default: false },
  clearLabel: { type: String, default: 'Clear selection' },
  closeLabel: { type: String, default: 'Close suggestions' },
  noResultsText: { type: String, default: 'No data available' },
  debounce: { type: Number, default: 0, validator: (value) => Number.isFinite(value) && value >= 0 },
};
