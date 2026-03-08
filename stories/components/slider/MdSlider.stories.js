import { ref, watch } from 'vue';
import MdSlider from '../../../src/components/slider/MdSlider.vue';

export default {
  title: 'Components/Slider',
  component: MdSlider,
  argTypes: {
    disabled: { control: 'boolean' },
    labeled: { control: 'boolean' },
    max: { control: 'number' },
    min: { control: 'number' },
    step: { control: 'number' },
    ticks: { control: 'boolean' },
  },
};

const SingleTemplate = (args) => ({
  components: { MdSlider },
  setup() {
    const singleValue = ref(args.modelValue ?? 50);

    watch(
      () => args.modelValue,
      (nextValue) => {
        if (nextValue === undefined) {
          return;
        }
        singleValue.value = nextValue;
      },
    );

    return { args, singleValue };
  },
  template: `
    <div style="max-width: 520px; padding: 20px;">
      <MdSlider v-bind="args" :range="false" v-model="singleValue" />
      <p style="margin-top: 12px; font-family: sans-serif;">Value: {{ singleValue }}</p>
    </div>
  `,
});

const RangeTemplate = (args) => ({
  components: { MdSlider },
  setup() {
    const valueStart = ref(args.valueStart ?? 30);
    const valueEnd = ref(args.valueEnd ?? 70);

    watch(
      () => args.valueStart,
      (nextValue) => {
        if (nextValue === undefined) {
          return;
        }
        valueStart.value = nextValue;
      },
    );

    watch(
      () => args.valueEnd,
      (nextValue) => {
        if (nextValue === undefined) {
          return;
        }
        valueEnd.value = nextValue;
      },
    );

    return { args, valueEnd, valueStart };
  },
  template: `
    <div style="max-width: 520px; padding: 20px;">
      <MdSlider
        v-bind="args"
        range
        :value-start="valueStart"
        :value-end="valueEnd"
        @update:valueStart="valueStart = $event"
        @update:valueEnd="valueEnd = $event"
      />
      <p style="margin-top: 12px; font-family: sans-serif;">
        Range: {{ valueStart }} - {{ valueEnd }}
      </p>
    </div>
  `,
});

export const Single = SingleTemplate.bind({});
Single.args = {
  min: 0,
  max: 100,
  step: 1,
  modelValue: 50,
  ticks: false,
  labeled: false,
  disabled: false,
};

export const LabeledTicks = SingleTemplate.bind({});
LabeledTicks.args = {
  min: 0,
  max: 100,
  step: 10,
  modelValue: 40,
  ticks: true,
  labeled: true,
  disabled: false,
};

export const Range = RangeTemplate.bind({});
Range.args = {
  min: 0,
  max: 100,
  step: 1,
  valueStart: 25,
  valueEnd: 75,
  ticks: false,
  labeled: false,
  disabled: false,
};

export const RangeLabeledTicks = RangeTemplate.bind({});
RangeLabeledTicks.args = {
  min: 0,
  max: 100,
  step: 10,
  valueStart: 30,
  valueEnd: 70,
  ticks: true,
  labeled: true,
  disabled: false,
};
