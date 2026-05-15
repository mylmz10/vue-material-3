export default {
  title: 'Foundations/Typography',
};

const TYPESCALES = [
  { name: 'Display Large', className: 'md-typescale-display-large', sample: 'Living beautifully, every day.' },
  { name: 'Display Medium', className: 'md-typescale-display-medium', sample: 'Designed for calm, built for clarity.' },
  { name: 'Display Small', className: 'md-typescale-display-small', sample: 'A clear visual rhythm.' },
  { name: 'Headline Large', className: 'md-typescale-headline-large', sample: 'A versatile headline for content blocks.' },
  { name: 'Headline Medium', className: 'md-typescale-headline-medium', sample: 'Readable, balanced, and prominent.' },
  { name: 'Headline Small', className: 'md-typescale-headline-small', sample: 'Compact emphasis with strong hierarchy.' },
  { name: 'Title Large', className: 'md-typescale-title-large', sample: 'Section title that sets context.' },
  { name: 'Title Medium', className: 'md-typescale-title-medium', sample: 'Subsection title with medium emphasis.' },
  { name: 'Title Small', className: 'md-typescale-title-small', sample: 'Tight title for cards and lists.' },
  { name: 'Body Large', className: 'md-typescale-body-large', sample: 'Body text for longer passages and detailed explanations.' },
  { name: 'Body Medium', className: 'md-typescale-body-medium', sample: 'Default body text for forms, cards, and standard content.' },
  { name: 'Body Small', className: 'md-typescale-body-small', sample: 'Secondary body copy, captions, and supporting metadata.' },
  { name: 'Label Large', className: 'md-typescale-label-large', sample: 'Action label' },
  { name: 'Label Medium', className: 'md-typescale-label-medium', sample: 'Filter label' },
  { name: 'Label Small', className: 'md-typescale-label-small', sample: 'Tiny label' },
];

export const Scale = {
  render: () => ({
    setup() {
      return { typescales: TYPESCALES };
    },
    template: `
      <section style="padding: 32px; background: #f7f2fa; color: #1d1b20;">
        <div style="display: grid; gap: 24px;">
          <article
            v-for="item in typescales"
            :key="item.className"
            style="display: grid; gap: 8px; padding-bottom: 24px; border-bottom: 1px solid rgba(29,27,32,.08);"
          >
            <div class="md-typescale-label-medium" style="color: #6750a4;">{{ item.className }}</div>
            <div :class="item.className">{{ item.sample }}</div>
            <div
              v-if="item.className.includes('label-')"
              :class="item.className + '-prominent'"
              style="color: #6750a4;"
            >
              {{ item.sample }} prominent
            </div>
          </article>
        </div>
      </section>
    `,
  }),
};
