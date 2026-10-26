import { afterEach, describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { h } from 'vue';
import { computeAccessibleDescription, computeAccessibleName } from 'dom-accessibility-api';
import MdFilledTextField from '@/components/text-field/MdFilledTextField.vue';
import MdOutlinedTextField from '@/components/text-field/MdOutlinedTextField.vue';
import MdFilledAutoComplete from '@/components/autocomplete/MdFilledAutoComplete.vue';
import MdOutlinedAutoComplete from '@/components/autocomplete/MdOutlinedAutoComplete.vue';
import MdFilledDatePickerField from '@/components/datepicker/MdFilledDatePickerField.vue';
import MdOutlinedDatePickerField from '@/components/datepicker/MdOutlinedDatePickerField.vue';
import MdFilledTimePickerField from '@/components/timepicker/MdFilledTimePickerField.vue';
import MdOutlinedTimePickerField from '@/components/timepicker/MdOutlinedTimePickerField.vue';

const wrappers = [];
const render = (component, options = {}) => {
  const wrapper = mount(component, { ...options, attachTo: document.body });
  wrappers.push(wrapper);
  return wrapper;
};
afterEach(() => {
  wrappers.splice(0).forEach((wrapper) => wrapper.unmount());
  document.body.innerHTML = '';
});

describe.each([
  ['filled', MdFilledTextField],
  ['outlined', MdOutlinedTextField],
])('%s text field accessibility', (_, component) => {
  it('names the native input and updates its supporting/error description', async () => {
    const wrapper = render(component, { props: { label: 'Email', supportingText: 'Use your work email' } });
    const input = wrapper.get('input').element;
    expect(computeAccessibleName(input)).toBe('Email');
    expect(computeAccessibleDescription(input)).toBe('Use your work email');
    await wrapper.setProps({ error: true, errorText: 'Invalid email' });
    expect(computeAccessibleDescription(input)).toBe('Invalid email');
    expect(input.getAttribute('aria-invalid')).toBe('true');
    await wrapper.setProps({ error: false, supportingText: '' });
    expect(input.hasAttribute('aria-describedby')).toBe(false);
  });

  it('forwards native attributes and merges descriptions while retaining wrapper styling', async () => {
    document.body.innerHTML = '<span id="external-help">Additional help</span><span id="external-name">External label</span>';
    const wrapper = render(component, {
      props: { label: 'Email', supportingText: 'Required format' },
      attrs: { id: 'email', 'aria-label': 'Work email', 'aria-invalid': 'true', 'aria-describedby': 'external-help', tabindex: 2, class: 'consumer-field', style: 'width: 300px' },
    });
    const input = wrapper.get('input').element;
    expect(input.id).toBe('email');
    expect(document.querySelectorAll('#email')).toHaveLength(1);
    expect(computeAccessibleName(input)).toBe('Work email');
    expect(computeAccessibleDescription(input)).toBe('Additional help Required format');
    expect(input.tabIndex).toBe(2);
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(wrapper.classes()).toContain('consumer-field');
    expect(input.classList.contains('consumer-field')).toBe(false);
    expect(wrapper.element.style.width).toBe('300px');
    await wrapper.setProps({ id: 'updated-email', 'aria-labelledby': 'external-name' });
    expect(input.id).toBe('updated-email');
    expect(computeAccessibleName(input)).toBe('External label');
    expect(document.querySelectorAll('#email')).toHaveLength(0);
  });

  it('assigns unique input and description IDs and describes supporting slots', () => {
    const wrapper = render({
      render: () =>
        h('div', [h(component, { label: 'First', supportingText: 'First help' }), h(component, { label: 'Second' }, { 'supporting-text': () => 'Slot help', 'supporting-text-end': () => '5/10' })]),
    });
    const inputs = wrapper.findAll('input').map((input) => input.element);
    expect(inputs[0].id).toBeTruthy();
    expect(inputs[1].id).not.toBe(inputs[0].id);
    expect(inputs[0].getAttribute('aria-describedby')).not.toBe(inputs[1].getAttribute('aria-describedby'));
    expect(inputs.map((input) => computeAccessibleName(input))).toEqual(['First', 'Second']);
    expect(computeAccessibleDescription(inputs[1])).toBe('Slot help 5/10');
  });
});

describe.each([
  ['filled autocomplete', MdFilledAutoComplete],
  ['outlined autocomplete', MdOutlinedAutoComplete],
  ['filled date', MdFilledDatePickerField],
  ['outlined date', MdOutlinedDatePickerField],
  ['filled time', MdFilledTimePickerField],
  ['outlined time', MdOutlinedTimePickerField],
])('%s field integration', (_, component) => {
  it('connects the label and forwards consumer ID, name and ARIA to the input', async () => {
    const wrapper = render(component, { props: { label: 'Appointment' }, attrs: { id: 'appointment', name: 'appointment', class: 'consumer-field' } });
    const input = wrapper.get('input').element;
    expect(input.id).toBe('appointment');
    expect(document.querySelectorAll('#appointment')).toHaveLength(1);
    expect(input.name).toBe('appointment');
    expect(computeAccessibleName(input)).toBe('Appointment');
    await wrapper.setProps({ 'aria-label': 'Choose appointment' });
    expect(computeAccessibleName(input)).toBe('Choose appointment');
    expect(wrapper.classes()).toContain('consumer-field');
    expect(input.classList.contains('consumer-field')).toBe(false);
  });
});
