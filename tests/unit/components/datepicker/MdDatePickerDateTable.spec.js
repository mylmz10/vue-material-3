import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import MdDatePickerDateTable from '@/components/datepicker/MdDatePickerDateTable.vue';
import { buildMonthGrid } from '@/components/datepicker/datePickerUtils';

describe('MdDatePickerDateTable', () => {
  it.each(['en-US', 'tr-TR'])('owns date cells in seven-day rows for %s', (locale) => {
    const days = buildMonthGrid({ year: 2026, month: 5, locale, focusedIso: '2026-06-03', selectedIso: '2026-06-03' });
    const wrapper = mount(MdDatePickerDateTable, { props: { days, locale } });
    const rows = wrapper.findAll('[role="rowgroup"] > [role="row"]');
    expect(rows).toHaveLength(days.length / 7);
    expect(wrapper.findAll('[role="columnheader"]')).toHaveLength(7);
    expect(wrapper.findAll('[role="gridcell"]')).toHaveLength(days.length);
    for (const row of rows) {
      expect(row.findAll('[role="gridcell"]')).toHaveLength(7);
      expect(row.element.parentElement.parentElement.getAttribute('role')).toBe('grid');
      for (const cell of row.findAll('[role="gridcell"]')) expect(cell.element.parentElement).toBe(row.element);
    }
    expect(wrapper.findAll('[data-iso]').map((day) => day.attributes('data-iso'))).toEqual(days.map((day) => day.iso));
    const focused = wrapper.get('[data-iso="2026-06-03"]');
    expect(focused.attributes('tabindex')).toBe('0');
    expect(focused.element.parentElement.getAttribute('aria-selected')).toBe('true');
    wrapper.unmount();
  });

  it('preserves range classes and selection events inside week rows', async () => {
    const days = buildMonthGrid({ year: 2026, month: 5, rangeStartIso: '2026-06-05', rangeEndIso: '2026-06-09' });
    const wrapper = mount(MdDatePickerDateTable, { props: { days } });
    expect(wrapper.get('[data-iso="2026-06-05"]').element.parentElement.classList.contains('md-date-picker-date-table__day-cell--range-start')).toBe(true);
    expect(wrapper.get('[data-iso="2026-06-07"]').element.parentElement.classList.contains('md-date-picker-date-table__day-cell--range-fill')).toBe(true);
    await wrapper.get('[data-iso="2026-06-09"]').trigger('click');
    expect(wrapper.emitted('select')).toEqual([['2026-06-09']]);
    wrapper.unmount();
  });
});
