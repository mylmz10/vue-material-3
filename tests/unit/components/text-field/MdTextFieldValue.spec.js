import { afterEach, describe, expect, it } from 'vitest';
import { enableAutoUnmount, mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import MdFilledTextField from '@/components/text-field/MdFilledTextField.vue';
import MdOutlinedTextField from '@/components/text-field/MdOutlinedTextField.vue';

enableAutoUnmount(afterEach);

describe.each([['filled', MdFilledTextField], ['outlined', MdOutlinedTextField]])('%s text-field value', (_, component) => {
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
