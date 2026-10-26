import { afterEach, describe, expect, it } from 'vitest';
import { h, nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import MdChip from '@/components/chips/MdChip.vue';
import MdInputChip from '@/components/chips/MdInputChip.vue';
import MdChipSet from '@/components/chips/MdChipSet.vue';

const mounted = [];
const render = (component, options = {}) => {
  const wrapper = mount(component, { attachTo: document.body, ...options });
  mounted.push(wrapper);
  return wrapper;
};
afterEach(() => mounted.splice(0).forEach((wrapper) => wrapper.unmount()));

const renderSet = (values, remove = true) => {
  const items = ref(values);
  return render({
    render: () =>
      h(
        MdChipSet,
        { 'aria-label': 'Recipients' },
        {
          default: () =>
            items.value.map((item) =>
              h(MdInputChip, {
                key: item.label,
                ...item,
                value: item.label,
                removable: true,
                onRemove: (value) => {
                  if (remove) items.value = items.value.filter((item) => item.label !== value);
                },
              })
            ),
        }
      ),
  });
};

describe('chip removal', () => {
  it.each([MdChip, MdInputChip])('removes a focused chip with Delete and Backspace without activating it', async (component) => {
    const wrapper = render(component, { props: { variant: 'input', label: 'Alpha', value: 'alpha', removable: true } });
    for (const key of ['Delete', 'Backspace']) {
      await wrapper.trigger('keydown', { key });
    }
    expect(wrapper.emitted('remove')).toEqual([['alpha'], ['alpha']]);
    expect(wrapper.emitted('click')).toBeUndefined();
    expect(wrapper.emitted('update:selected')).toBeUndefined();
  });

  it('reaches the remove button with ArrowRight and returns with ArrowLeft', async () => {
    const wrapper = render(MdInputChip, { props: { label: 'Alpha', removable: true } });
    wrapper.element.focus();
    await wrapper.trigger('keydown', { key: 'ArrowRight' });
    const remove = wrapper.get('button');
    expect(document.activeElement).toBe(remove.element);
    await remove.trigger('keydown', { key: 'ArrowLeft' });
    expect(document.activeElement).toBe(wrapper.element);
    await wrapper.trigger('keydown', { key: 'ArrowRight' });
    await remove.trigger('keydown', { key: 'Enter' });
    expect(wrapper.emitted('remove')).toHaveLength(1);
    expect(wrapper.emitted('click')).toBeUndefined();
  });

  it('reverses action navigation for RTL chips', async () => {
    const wrapper = render(MdInputChip, { props: { label: 'Alpha', removable: true }, attrs: { style: 'direction: rtl' } });
    wrapper.element.focus();
    await wrapper.trigger('keydown', { key: 'ArrowLeft' });
    expect(document.activeElement).toBe(wrapper.get('button').element);
    await wrapper.get('button').trigger('keydown', { key: 'ArrowRight' });
    expect(document.activeElement).toBe(wrapper.element);
  });

  it.each(['disabled', 'softDisabled'])('cannot remove a %s chip', async (state) => {
    const wrapper = render(MdInputChip, { props: { label: 'Alpha', removable: true, alwaysFocusable: true, [state]: true } });
    expect(wrapper.get('button').element.disabled).toBe(true);
    await wrapper.trigger('keydown', { key: 'Delete' });
    await wrapper.trigger('keydown', { key: 'Backspace' });
    await wrapper.get('button').trigger('keydown', { key: 'Enter' });
    expect(wrapper.emitted('remove')).toBeUndefined();
  });

  it('ignores deletion from nested editable content and composition events', async () => {
    const wrapper = render(MdInputChip, { props: { removable: true }, slots: { default: '<input value="Editing" />' } });
    await wrapper.get('input').trigger('keydown', { key: 'Backspace' });
    await wrapper.trigger('keydown', { key: 'Delete', isComposing: true });
    expect(wrapper.emitted('remove')).toBeUndefined();
  });

  it('leaves nonremovable and linked chips unchanged', async () => {
    const wrapper = render(MdInputChip, { props: { label: 'Alpha' } });
    await wrapper.trigger('keydown', { key: 'Delete' });
    await wrapper.setProps({ removable: true, href: '/alpha' });
    await wrapper.trigger('keydown', { key: 'Backspace' });
    expect(wrapper.emitted('remove')).toBeUndefined();
  });

  it('moves to the next enabled chip and then the previous one after actual removal', async () => {
    const wrapper = renderSet([{ label: 'Alpha' }, { label: 'Beta' }, { label: 'Disabled', disabled: true }, { label: 'Gamma' }]);
    await nextTick();
    const beta = wrapper.findAll('.md-chip')[1];
    beta.element.focus();
    await beta.trigger('keydown', { key: 'Delete' });
    await nextTick();
    expect(document.activeElement.textContent).toContain('Gamma');
    const gamma = wrapper.findAll('.md-chip').at(-1);
    await gamma.trigger('keydown', { key: 'Backspace' });
    await nextTick();
    expect(document.activeElement.textContent).toContain('Alpha');
    await wrapper.findAll('.md-chip')[0].trigger('keydown', { key: 'Delete' });
    await nextTick();
    expect(document.activeElement).toBe(wrapper.get('.md-chip-set').element);
  });

  it('recovers focus when the trailing remove action deletes a chip', async () => {
    const wrapper = renderSet([{ label: 'Alpha' }, { label: 'Beta' }]);
    await nextTick();
    const alpha = wrapper.findAll('.md-chip')[0];
    alpha.element.focus();
    await alpha.trigger('keydown', { key: 'ArrowRight' });
    expect(document.activeElement).toBe(alpha.get('button').element);
    await alpha.get('button').trigger('keydown', { key: 'Enter' });
    await nextTick();
    expect(document.activeElement).toBe(wrapper.get('.md-chip').element);
    expect(document.activeElement.textContent).toContain('Beta');
  });

  it('retains focus when a parent declines removal', async () => {
    const wrapper = renderSet([{ label: 'Alpha' }, { label: 'Beta' }], false);
    const alpha = wrapper.findAll('.md-chip')[0];
    alpha.element.focus();
    await alpha.trigger('keydown', { key: 'Delete' });
    await nextTick();
    expect(wrapper.findAll('.md-chip')).toHaveLength(2);
    expect(document.activeElement).toBe(alpha.element);
  });

  it('does not override focus explicitly moved by the consumer after removal', async () => {
    const items = ref(['Alpha', 'Beta']);
    const wrapper = render({
      render: () =>
        h('div', [
          h('input', { id: 'recipient-input' }),
          h(MdChipSet, null, {
            default: () =>
              items.value.map((label) =>
                h(MdInputChip, {
                  key: label,
                  label,
                  removable: true,
                  onRemove: () => {
                    items.value = items.value.filter((item) => item !== label);
                    document.getElementById('recipient-input').focus();
                  },
                })
              ),
          }),
        ]),
    });
    await nextTick();
    const alpha = wrapper.findAll('.md-chip')[0];
    alpha.element.focus();
    await alpha.trigger('keydown', { key: 'Delete' });
    await nextTick();
    expect(document.activeElement).toBe(wrapper.get('input').element);
  });

  it('uses the focused remove button to resolve subsequent ChipSet navigation', async () => {
    const wrapper = renderSet([{ label: 'Alpha' }, { label: 'Beta' }, { label: 'Gamma' }]);
    await nextTick();
    const beta = wrapper.findAll('.md-chip')[1];
    beta.get('button').element.focus();
    await beta.get('button').trigger('keydown', { key: 'ArrowRight' });
    expect(document.activeElement.textContent).toContain('Gamma');
  });
});
