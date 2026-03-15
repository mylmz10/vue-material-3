import MdTooltip from '../../../src/components/tooltip/MdTooltip.vue';

export default {
  title: 'Components/Tooltip',
};

export const PlainTooltip = () => ({
  components: { MdTooltip },
  template: `
    <div style="padding: 96px; min-height: 360px; background: #f7f2fa; display: flex; align-items: center; justify-content: center;">
      <MdTooltip text="Add to list">
        <button
          type="button"
          style="width: 56px; height: 56px; border: none; border-radius: 16px; background: #ece6f0; color: #49454f; cursor: pointer; font-size: 24px;"
        >
          +
        </button>
      </MdTooltip>
    </div>
  `,
});

export const PlainTextBoundary = () => ({
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
});

export const RichTooltip = () => ({
  components: { MdTooltip },
  template: `
    <div style="padding: 96px; min-height: 360px; background: #f7f2fa; display: flex; align-items: center; justify-content: center;">
      <MdTooltip
        variant="rich"
        headline="Rich tooltip"
        supporting-text="Rich tooltips bring attention to a particular element or feature that warrants the user's focus."
        action-label="Action"
      >
        <button
          type="button"
          style="padding: 12px 20px; border: none; border-radius: 999px; background: #6750a4; color: white; cursor: pointer; font: inherit;"
        >
          Hover me
        </button>
      </MdTooltip>
    </div>
  `,
});

export const PersistentRichTooltip = () => ({
  components: { MdTooltip },
  template: `
    <div style="padding: 96px; min-height: 360px; background: #f7f2fa; display: flex; align-items: center; justify-content: center;">
      <MdTooltip
        variant="rich"
        :persistent="true"
        headline="Paint Tool"
        supporting-text="Add annotations and highlights with the paint tool."
        action-label="Learn more"
      >
        <button
          type="button"
          style="width: 56px; height: 56px; border: none; border-radius: 16px; background: #ece6f0; color: #49454f; cursor: pointer; font-size: 20px;"
        >
          ✎
        </button>
      </MdTooltip>
    </div>
  `,
});
