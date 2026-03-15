import MdTooltip from '../../../src/components/tooltip/MdTooltip.vue';

const placementOptions = [
  '',
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
];

const renderTooltip = (args, triggerTemplate) => ({
  components: { MdTooltip },
  setup() {
    return { args };
  },
  template: `
    <div style="padding: 96px; min-height: 360px; background: #f7f2fa; display: flex; align-items: center; justify-content: center;">
      <MdTooltip v-bind="args">
        ${triggerTemplate}
      </MdTooltip>
    </div>
  `,
});

export default {
  title: 'Components/Tooltip',
  component: MdTooltip,
  argTypes: {
    actionLabel: { control: 'text' },
    boundary: {
      control: 'select',
      options: ['visual', 'text'],
    },
    disabled: { control: 'boolean' },
    headline: { control: 'text' },
    inAppBar: { control: 'boolean' },
    interactive: { control: 'boolean' },
    modelValue: { control: 'boolean' },
    persistent: { control: 'boolean' },
    placement: {
      control: 'select',
      options: placementOptions,
    },
    supportingText: { control: 'text' },
    text: { control: 'text' },
    variant: {
      control: 'select',
      options: ['plain', 'rich'],
    },
  },
};

export const Playground = {
  args: {
    actionLabel: 'Learn more',
    boundary: 'visual',
    disabled: false,
    headline: 'Rich tooltip',
    inAppBar: false,
    interactive: true,
    modelValue: undefined,
    persistent: false,
    placement: '',
    supportingText: "Rich tooltips bring attention to a particular element or feature that warrants the user's focus.",
    text: 'Add to list',
    variant: 'plain',
  },
  render: (args) =>
    renderTooltip(
      args,
      `
        <button
          type="button"
          style="padding: 12px 20px; border: none; border-radius: 999px; background: #6750a4; color: white; cursor: pointer; font: inherit;"
        >
          Hover me
        </button>
      `
    ),
};

export const PlainTooltip = {
  args: {
    text: 'Add to list',
  },
  render: (args) =>
    renderTooltip(
      args,
      `
        <button
          type="button"
          style="width: 56px; height: 56px; border: none; border-radius: 16px; background: #ece6f0; color: #49454f; cursor: pointer; font-size: 24px;"
        >
          +
        </button>
      `
    ),
};

export const PlainTextBoundary = {
  render: () => ({
    components: { MdTooltip },
    template: `
      <div style="padding: 96px; min-height: 360px; background: #f7f2fa; display: flex; align-items: center; justify-content: center; font-family: sans-serif; color: #1d1b20;">
        <p style="margin: 0; font-size: 18px; line-height: 1.6;">
          Stock grants use the closing price from the day before the grant date.
          <MdTooltip boundary="text" text="Grant value is calculated using the closing stock price from the day before the grant date. Amounts do not reflect tax withholdings.">
            <span style="text-decoration: underline dotted; cursor: help;">How is this calculated?</span>
          </MdTooltip>
        </p>
      </div>
    `,
  }),
};

export const RichTooltip = {
  args: {
    variant: 'rich',
    headline: 'Rich tooltip',
    supportingText: "Rich tooltips bring attention to a particular element or feature that warrants the user's focus.",
    actionLabel: 'Action',
  },
  render: (args) =>
    renderTooltip(
      args,
      `
        <button
          type="button"
          style="padding: 12px 20px; border: none; border-radius: 999px; background: #6750a4; color: white; cursor: pointer; font: inherit;"
        >
          Hover me
        </button>
      `
    ),
};

export const PersistentRichTooltip = {
  args: {
    variant: 'rich',
    persistent: true,
    headline: 'Paint Tool',
    supportingText: 'Add annotations and highlights with the paint tool.',
    actionLabel: 'Learn more',
  },
  render: (args) =>
    renderTooltip(
      args,
      `
        <button
          type="button"
          style="width: 56px; height: 56px; border: none; border-radius: 16px; background: #ece6f0; color: #49454f; cursor: pointer; font-size: 20px;"
        >
          ✎
        </button>
      `
    ),
};
