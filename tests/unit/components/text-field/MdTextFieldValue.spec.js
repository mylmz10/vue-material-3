import { afterEach, describe, expect, it } from 'vitest';
import { enableAutoUnmount, mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import MdFilledTextField from '@/components/text-field/MdFilledTextField.vue';
import MdOutlinedTextField from '@/components/text-field/MdOutlinedTextField.vue';

enableAutoUnmount(afterEach);

describe.each([
  ['filled', MdFilledTextField],
  ['outlined', MdOutlinedTextField],
])('%s text-field value', (_, component) => {
  it.each([
    ['', ''],
    [0, '0'],
    [null, ''],
  ])('prioritizes explicit model %s over legacy value updates', async (modelValue, expected) => {
    const wrapper = mount(component, { props: { modelValue, value: 'fallback' } });
    expect(wrapper.get('input').element.value).toBe(expected);
    await wrapper.setProps({ value: 'later fallback' });
    expect(wrapper.get('input').element.value).toBe(expected);
  });

  it('uses reactive legacy values only while the model is absent', async () => {
    const wrapper = mount(component, { props: { value: 'initial' } });
    expect(wrapper.get('input').element.value).toBe('initial');
    await wrapper.setProps({ value: 'later' });
    expect(wrapper.get('input').element.value).toBe('later');
    await wrapper.setProps({ modelValue: '' });
    expect(wrapper.get('input').element.value).toBe('');
    await wrapper.setProps({ value: 'ignored while controlled' });
    expect(wrapper.get('input').element.value).toBe('');
    await wrapper.setProps({ modelValue: undefined });
    expect(wrapper.get('input').element.value).toBe('ignored while controlled');
  });

  it('restores an initially empty model on a normal form reset', async () => {
    const form = document.createElement('form');
    document.body.append(form);
    const wrapper = mount(component, { attachTo: form, props: { modelValue: '', value: 'fallback' } });
    await wrapper.get('input').setValue('edited');
    form.reset();
    await nextTick();
    await nextTick();
    expect(wrapper.get('input').element.value).toBe('');
    expect(wrapper.emitted('update:modelValue').at(-1)).toEqual(['']);
    wrapper.unmount();
    form.remove();
  });

  it('honors reset cancellation by a listener registered after mounting', async () => {
    const form = document.createElement('form');
    document.body.append(form);
    const wrapper = mount(component, { attachTo: form, props: { value: '10' } });
    await wrapper.get('input').setValue('25');
    const updates = wrapper.emitted('update:modelValue').length;
    const preventReset = (event) => event.preventDefault();
    form.addEventListener('reset', preventReset);
    form.reset();
    await nextTick();
    await nextTick();
    expect(wrapper.get('input').element.value).toBe('25');
    expect(wrapper.emitted('update:modelValue')).toHaveLength(updates);
    form.removeEventListener('reset', preventReset);
    form.reset();
    await nextTick();
    await nextTick();
    expect(wrapper.get('input').element.value).toBe('10');
    expect(wrapper.emitted('update:modelValue').at(-1)).toEqual(['10']);
    wrapper.unmount();
    form.remove();
  });
});
