import { afterEach, expect, it, vi } from 'vitest';
import { enableAutoUnmount, mount } from '@vue/test-utils';
import { h, nextTick } from 'vue';
import Checkbox from '@/components/checkbox/MdCheckbox.vue';
import Radio from '@/components/radio/MdRadio.vue';
import Switch from '@/components/switch/MdSwitch.vue';
import DateField from '@/components/datepicker/MdDatePickerField.vue';
import TimeField from '@/components/timepicker/MdTimePickerField.vue';
import TimePicker from '@/components/timepicker/MdTimePicker.vue';
import DatePicker from '@/components/datepicker/MdDatePicker.vue';
import Slider from '@/components/slider/MdSlider.vue';
import Tabs from '@/components/tabs/MdTabs.vue';
import Tab from '@/components/tabs/MdPrimaryTab.vue';
import Dialog from '@/components/dialog/MdDialog.vue';
import Menu from '@/components/menu/MdMenu.vue';
import MenuItem from '@/components/menu/MdMenuItem.vue';
import Tooltip from '@/components/tooltip/MdTooltip.vue';

enableAutoUnmount(afterEach);
afterEach(() => {
  document.body.replaceChildren();
});
const settle = async () => {
  await nextTick();
  await nextTick();
  await nextTick();
};
const confirm = (wrapper) =>
  wrapper
    .findAll('button')
    .find((button) => button.text() === 'OK')
    .trigger('click');

it.each([Checkbox, Radio, Switch])('forwards accessible names and explicit labels to the %s input', async (Control) => {
  const wrapper = mount(Control, {
    attachTo: document.body,
    attrs: { id: 'choice', 'aria-label': 'Pick one', 'aria-labelledby': 'choice-label', class: 'layout', style: 'margin: 4px' },
  });
  const input = wrapper.get('input');
  expect(input.attributes()).toMatchObject({ id: 'choice', 'aria-label': 'Pick one', 'aria-labelledby': 'choice-label' });
  expect(wrapper.attributes('id')).toBeUndefined();
  expect(wrapper.classes()).toContain('layout');
  expect(input.classes()).not.toContain('layout');
  const label = document.createElement('label');
  label.id = 'choice-label';
  label.htmlFor = 'choice';
  label.textContent = 'Pick one';
  document.body.append(label);
  label.click();
  await settle();
  expect(input.element.checked).toBe(true);
});

it('synchronizes radio visuals within their shadow root and removes the root listener', async () => {
  const host = document.createElement('div');
  document.body.append(host);
  const root = host.attachShadow({ mode: 'open' });
  const remove = vi.spyOn(root, 'removeEventListener');
  const wrapper = mount({ render: () => h('div', [h(Radio, { name: 'group', value: 'a' }), h(Radio, { name: 'group', value: 'b' })]) }, { attachTo: root });
  const inputs = wrapper.findAll('input');
  inputs[0].element.click();
  await settle();
  inputs[1].element.click();
  await settle();
  expect(inputs.map((input) => input.element.checked)).toEqual([false, true]);
  expect(wrapper.findAll('.md-radio').map((radio) => radio.classes().includes('md-radio--checked'))).toEqual([false, true]);
  wrapper.unmount();
  expect(remove).toHaveBeenCalledWith('change', expect.any(Function), true);
});

it.each([
  [0, 10, 6, 10, '6'],
  [0.1, 0.3, 0.1, 0.3, '0.3'],
  [0.1, 1, 0.2, 1, '0.9'],
])('keeps a slider endpoint on its step grid (%s..%s step %s)', (min, max, step, modelValue, expected) => {
  const wrapper = mount(Slider, { props: { min, max, step, modelValue } });
  expect(wrapper.get('input').element.value).toBe(expected);
  expect(wrapper.get('input').element.validity.stepMismatch).toBe(false);
});

it.each(['auto', 'manual'])('emits only one selection per tab activation in %s mode', async (activationMode) => {
  const wrapper = mount(Tabs, { attachTo: document.body, props: { activationMode }, slots: { default: () => [h(Tab, { label: 'A' }), h(Tab, { label: 'B' })] } });
  await settle();
  const buttons = wrapper.findAll('button');
  buttons[0].element.focus();
  await settle();
  const before = wrapper.emitted('change')?.length || 0;
  await buttons[0].trigger('keydown', { key: 'ArrowRight' });
  await settle();
  if (activationMode === 'manual') {
    expect(wrapper.emitted('change')?.length || 0).toBe(before);
    await buttons[1].trigger('keydown', { key: 'Enter' });
  }
  expect(wrapper.emitted('change').length - before).toBe(1);
  expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
});

it.each([DateField, TimeField])('resets outer picker values and current display format for %s', async (Field) => {
  const date = Field === DateField;
  const initial = date ? '2026-03-14' : '07:00';
  const later = date ? '2026-03-18' : '09:30';
  const form = document.createElement('form');
  document.body.append(form);
  const wrapper = mount(Field, { attachTo: form, props: { modelValue: initial } });
  await wrapper.setProps({ modelValue: later, ...(date ? { displayFormat: 'DD/MM/YYYY' } : { hourCycle: 24 }) });
  form.reset();
  await settle();
  expect(wrapper.emitted('update:modelValue')).toEqual([[initial]]);
  expect(wrapper.get('input').element.value).toBe(date ? '14/03/2026' : '07:00');
});

it.each([DateField, TimeField])('preserves outer values and display when a %s reset is canceled', async (Field) => {
  const date = Field === DateField;
  const form = document.createElement('form');
  document.body.append(form);
  const wrapper = mount(Field, { attachTo: form, props: { modelValue: date ? '2026-03-14' : '07:00', ...(date ? {} : { hourCycle: 24 }) } });
  await wrapper.setProps({ modelValue: date ? '2026-03-18' : '09:30' });
  form.addEventListener('reset', (event) => event.preventDefault());
  form.reset();
  await settle();
  expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  expect(wrapper.get('input').element.value).toBe(date ? '03/18/2026' : '09:30');
});

it.each([DateField, TimeField])('keeps the current display format on %s reset when the canonical value has not changed', async (Field) => {
  const date = Field === DateField;
  const initial = date ? '2026-03-14' : '19:30';
  const form = document.createElement('form');
  document.body.append(form);
  const wrapper = mount(Field, { attachTo: form, props: { modelValue: initial } });
  await wrapper.setProps(date ? { displayFormat: 'DD/MM/YYYY' } : { hourCycle: 24 });
  form.reset();
  await settle();
  expect(wrapper.get('input').element.value).toBe(date ? '14/03/2026' : '19:30');
  expect(wrapper.emitted('update:modelValue')).toEqual([[initial]]);
});

it('snapshots the initial range for reset rather than retaining a mutable object', async () => {
  const initial = { start: '2026-03-14', end: '2026-03-18' };
  const form = document.createElement('form');
  document.body.append(form);
  const wrapper = mount(DateField, { attachTo: form, props: { modelValue: initial, selectionMode: 'range' } });
  initial.start = '2026-03-15';
  await wrapper.setProps({ modelValue: { start: '2026-03-20', end: '2026-03-22' } });
  form.reset();
  await settle();
  expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([{ start: '2026-03-14', end: '2026-03-18' }]);
});

it.each(['docked', 'modal', 'modal-input'])('closes a %s date picker when its field becomes disabled', async (pickerVariant) => {
  const wrapper = mount(DateField, { attachTo: document.body, props: { modelValue: '2026-03-14', pickerVariant } });
  await wrapper.get('.md-date-picker-field__control').trigger('click');
  const picker = wrapper.getComponent(DatePicker);
  await wrapper.setProps({ disabled: true });
  picker.vm.$emit('update:modelValue', '2026-03-18');
  await settle();
  expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  expect(wrapper.find('.md-date-picker-field__panel').exists()).toBe(false);
  expect(wrapper.find('dialog[open]').exists()).toBe(false);
});

it('closes a time picker when disabled and rejects stale popup updates', async () => {
  const wrapper = mount(TimeField, { attachTo: document.body, props: { modelValue: '07:00' } });
  await wrapper.get('.md-time-picker-field__control').trigger('click');
  const picker = wrapper.getComponent(TimePicker);
  await wrapper.setProps({ disabled: true });
  picker.vm.$emit('update:modelValue', '09:00');
  picker.vm.$emit('update:open', true);
  await settle();
  expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  expect(wrapper.find('dialog[open]').exists()).toBe(false);
});

it('reformats a valid date when displayFormat changes', async () => {
  const wrapper = mount(DateField, { props: { modelValue: '2026-03-14' } });
  await wrapper.setProps({ displayFormat: 'DD/MM/YYYY' });
  expect(wrapper.get('input').element.value).toBe('14/03/2026');
  await wrapper.get('input').trigger('change');
  expect(wrapper.emitted('invalid-input')).toBeUndefined();
  expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['2026-03-14']);
});

it.each([
  [12, 24],
  [24, 12],
])('preserves a time when changing hour cycle from %s to %s', async (hourCycle, nextCycle) => {
  const wrapper = mount(TimePicker, { attachTo: document.body, props: { modelValue: '19:30', open: true, entryMode: 'input', hourCycle } });
  await wrapper.setProps({ hourCycle: nextCycle });
  await confirm(wrapper);
  expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['19:30']);
});

it('preserves a valid edited time draft when changing the hour cycle', async () => {
  const wrapper = mount(TimePicker, { attachTo: document.body, props: { modelValue: '19:30', open: true, entryMode: 'input', hourCycle: 24 } });
  await wrapper.get('[data-input="hour"]').setValue('21');
  await wrapper.setProps({ hourCycle: 12 });
  expect(wrapper.get('[data-input="hour"]').element.value).toBe('09');
  await confirm(wrapper);
  expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['21:30']);
});

it('closes menus before a retained dialog closes and lets them reopen normally', async () => {
  const wrapper = mount(Dialog, {
    attachTo: document.body,
    props: { modelValue: true, keepMounted: true },
    slots: { default: () => h(Menu, {}, { activator: () => h('button', {}, 'Menu'), default: () => h(MenuItem, { label: 'Item' }) }) },
  });
  await settle();
  const menu = wrapper.getComponent(Menu);
  menu.vm.open();
  await settle();
  expect(menu.classes()).toContain('md-menu--open');
  await wrapper.setProps({ modelValue: false });
  expect(menu.classes()).not.toContain('md-menu--open');
  expect(menu.emitted('close')?.at(-1)).toEqual([{ source: 'dialog' }]);
  await wrapper.setProps({ modelValue: true });
  await settle();
  menu.vm.open();
  await settle();
  expect(menu.classes()).toContain('md-menu--open');
});

it('disabling a rich tooltip closes it and blocks an action before DOM update', async () => {
  const wrapper = mount(Tooltip, { attachTo: document.body, props: { variant: 'rich', persistent: true, modelValue: true, actionLabel: 'Action' }, slots: { default: '<button>Trigger</button>' } });
  await settle();
  const action = document.querySelector('.md-tooltip__action');
  expect(action).not.toBe(null);
  await wrapper.setProps({ disabled: true });
  action.click();
  await settle();
  expect(document.querySelector('.md-tooltip__action')).toBe(null);
  expect(wrapper.emitted('action')).toBeUndefined();
});

it('never opens a disabled tooltip through its model', async () => {
  const wrapper = mount(Tooltip, { attachTo: document.body, props: { disabled: true, modelValue: true, text: 'Details' }, slots: { default: '<button>Trigger</button>' } });
  await settle();
  expect(document.querySelector('[role=tooltip]')).toBe(null);
  await wrapper.setProps({ modelValue: false });
  await wrapper.setProps({ modelValue: true });
  expect(document.querySelector('[role=tooltip]')).toBe(null);
});
