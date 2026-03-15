import { ref } from 'vue';
import MdTimePicker from '../../../src/components/timepicker/MdTimePicker.vue';
import MdTimePickerField from '../../../src/components/timepicker/MdTimePickerField.vue';

export default {
  title: 'Components/TimePicker',
};

export const FieldDial = () => ({
  components: { MdTimePickerField },
  setup() {
    const value = ref('07:00');
    return { value };
  },
  template: `
    <div style="padding: 24px; min-height: 520px; background: #f7f2fa;">
      <MdTimePickerField v-model="value" />
      <p style="margin-top: 24px; font-family: sans-serif;">Selected: {{ value }}</p>
    </div>
  `,
});

export const FieldInput = () => ({
  components: { MdTimePickerField },
  setup() {
    const value = ref('19:25');
    return { value };
  },
  template: `
    <div style="padding: 24px; min-height: 520px; background: #f7f2fa;">
      <MdTimePickerField v-model="value" entry-mode="input" />
      <p style="margin-top: 24px; font-family: sans-serif;">Selected: {{ value }}</p>
    </div>
  `,
});

export const FieldDial24Hour = () => ({
  components: { MdTimePickerField },
  setup() {
    const value = ref('20:00');
    return { value };
  },
  template: `
    <div style="padding: 24px; min-height: 520px; background: #f7f2fa;">
      <MdTimePickerField v-model="value" :hour-cycle="24" />
      <p style="margin-top: 24px; font-family: sans-serif;">Selected: {{ value }}</p>
    </div>
  `,
});

export const ModalDial = () => ({
  components: { MdTimePicker },
  setup() {
    const value = ref('07:00');
    const open = ref(true);
    return { open, value };
  },
  template: `
    <div style="padding: 24px; min-height: 640px; background: #f7f2fa;">
      <MdTimePicker v-model="value" v-model:open="open" />
      <button style="margin-top: 12px;" @click="open = true">Open modal</button>
    </div>
  `,
});

export const ModalDial24Hour = () => ({
  components: { MdTimePicker },
  setup() {
    const value = ref('20:00');
    const open = ref(true);
    return { open, value };
  },
  template: `
    <div style="padding: 24px; min-height: 640px; background: #f7f2fa;">
      <MdTimePicker v-model="value" v-model:open="open" :hour-cycle="24" />
      <button style="margin-top: 12px;" @click="open = true">Open modal</button>
    </div>
  `,
});

export const ModalInput = () => ({
  components: { MdTimePicker },
  setup() {
    const value = ref('19:25');
    const open = ref(true);
    return { open, value };
  },
  template: `
    <div style="padding: 24px; min-height: 520px; background: #f7f2fa;">
      <MdTimePicker v-model="value" v-model:open="open" entry-mode="input" />
      <button style="margin-top: 12px;" @click="open = true">Open modal</button>
    </div>
  `,
});

export const ModalInput24Hour = () => ({
  components: { MdTimePicker },
  setup() {
    const value = ref('20:15');
    const open = ref(true);
    return { open, value };
  },
  template: `
    <div style="padding: 24px; min-height: 520px; background: #f7f2fa;">
      <MdTimePicker v-model="value" v-model:open="open" entry-mode="input" :hour-cycle="24" />
      <button style="margin-top: 12px;" @click="open = true">Open modal</button>
    </div>
  `,
});
