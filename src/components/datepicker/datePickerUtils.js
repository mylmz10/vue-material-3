import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isToday from 'dayjs/plugin/isToday';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';

import 'dayjs/locale/en';
import 'dayjs/locale/tr';

dayjs.extend(customParseFormat);
dayjs.extend(isToday);
dayjs.extend(localeData);
dayjs.extend(weekday);

export const MODEL_FORMAT = 'YYYY-MM-DD';
export const DEFAULT_DISPLAY_FORMAT = 'MM/DD/YYYY';

const SUPPORTED_DAYJS_LOCALES = new Set(['en', 'tr']);

export const resolveDayjsLocale = (locale = 'en-US') => {
  const baseLocale = `${locale}`.toLowerCase().replace('_', '-').split('-')[0];
  return SUPPORTED_DAYJS_LOCALES.has(baseLocale) ? baseLocale : 'en';
};

export const parseModelValue = (value) => {
  if (!value) {
    return null;
  }

  const parsed = dayjs(value, MODEL_FORMAT, true);
  return parsed.isValid() ? parsed.startOf('day') : null;
};

export const toIso = (value) => {
  if (!value) {
    return null;
  }

  return value.format(MODEL_FORMAT);
};

export const normalizeRangeModelValue = (value) => {
  if (!value || typeof value !== 'object') {
    return {
      start: null,
      end: null,
    };
  }

  return {
    start: typeof value.start === 'string' && value.start ? value.start : null,
    end: typeof value.end === 'string' && value.end ? value.end : null,
  };
};

const coerceRangePart = (value) => {
  if (!value) {
    return null;
  }

  if (dayjs.isDayjs(value)) {
    return value.startOf('day');
  }

  if (typeof value === 'string') {
    return parseModelValue(value);
  }

  return null;
};

export const parseRangeModelValue = (value) => {
  return {
    start: coerceRangePart(value?.start),
    end: coerceRangePart(value?.end),
  };
};

export const toRangeIso = (value) => {
  const parsedRange = parseRangeModelValue(value);
  return {
    start: toIso(parsedRange.start),
    end: toIso(parsedRange.end),
  };
};

export const sortRangeDates = (startDate, endDate) => {
  if (!startDate && !endDate) {
    return {
      start: null,
      end: null,
    };
  }

  if (!startDate) {
    return {
      start: endDate?.startOf('day') ?? null,
      end: null,
    };
  }

  if (!endDate) {
    return {
      start: startDate.startOf('day'),
      end: null,
    };
  }

  if (startDate.isAfter(endDate, 'day')) {
    return {
      start: endDate.startOf('day'),
      end: startDate.startOf('day'),
    };
  }

  return {
    start: startDate.startOf('day'),
    end: endDate.startOf('day'),
  };
};

export const isRangeAllowed = (value, constraints = {}) => {
  const parsedRange = value?.start !== undefined || value?.end !== undefined ? parseRangeModelValue(value) : value;
  const normalizedRange = sortRangeDates(parsedRange?.start ?? null, parsedRange?.end ?? null);

  if (!normalizedRange.start && !normalizedRange.end) {
    return true;
  }

  if (normalizedRange.start && !normalizedRange.end) {
    return isDateAllowed(normalizedRange.start, constraints);
  }

  let cursor = normalizedRange.start;
  while (cursor.isBefore(normalizedRange.end, 'day') || cursor.isSame(normalizedRange.end, 'day')) {
    if (!isDateAllowed(cursor, constraints)) {
      return false;
    }

    cursor = cursor.add(1, 'day').startOf('day');
  }

  return true;
};

export const parseDisplayValue = (value, displayFormat = DEFAULT_DISPLAY_FORMAT, locale = 'en-US') => {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  const parsed = dayjs(value, displayFormat, resolveDayjsLocale(locale), true);
  return parsed.isValid() ? parsed.startOf('day') : null;
};

export const formatDisplayValue = (value, displayFormat = DEFAULT_DISPLAY_FORMAT, locale = 'en-US') => {
  const parsedValue = typeof value === 'string' ? parseModelValue(value) : value;

  if (!parsedValue) {
    return '';
  }

  return parsedValue.locale(resolveDayjsLocale(locale)).format(displayFormat);
};

export const formatRangeDisplayValue = (value, displayFormat = DEFAULT_DISPLAY_FORMAT, locale = 'en-US') => {
  const parsedRange = value?.start !== undefined || value?.end !== undefined ? parseRangeModelValue(value) : value;
  const startValue = formatDisplayValue(parsedRange?.start ?? null, displayFormat, locale);
  const endValue = formatDisplayValue(parsedRange?.end ?? null, displayFormat, locale);

  if (!startValue && !endValue) {
    return '';
  }

  if (startValue && endValue) {
    return `${startValue} - ${endValue}`;
  }

  return startValue || endValue;
};

export const parseRangeDisplayValue = (value, displayFormat = DEFAULT_DISPLAY_FORMAT, locale = 'en-US') => {
  if (value === null || value === undefined || value === '') {
    return {
      start: null,
      end: null,
    };
  }

  const parts = `${value}`.split(/\s[–-]\s/);
  if (parts.length !== 2) {
    return null;
  }

  const startDate = parseDisplayValue(parts[0], displayFormat, locale);
  const endDate = parseDisplayValue(parts[1], displayFormat, locale);

  if (!startDate || !endDate) {
    return null;
  }

  return sortRangeDates(startDate, endDate);
};

export const formatHeadlineDate = (value, locale = 'en-US') => {
  const parsedValue = typeof value === 'string' ? parseModelValue(value) : value;

  if (!parsedValue) {
    return 'No date selected';
  }

  return new Intl.DateTimeFormat(locale, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(parsedValue.toDate());
};

export const formatRangeHeadlineDate = (value, locale = 'en-US') => {
  const parsedRange = value?.start !== undefined || value?.end !== undefined ? parseRangeModelValue(value) : value;
  const startDate = parsedRange?.start ?? null;
  const endDate = parsedRange?.end ?? null;

  if (!startDate && !endDate) {
    return 'Enter dates';
  }

  const formatter = new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
  });

  const startLabel = startDate ? formatter.format(startDate.toDate()) : '...';
  const endLabel = endDate ? formatter.format(endDate.toDate()) : '...';

  return `${startLabel} - ${endLabel}`;
};

export const formatMonthLabel = (year, month, locale = 'en-US', options = {}) => {
  const parsedValue = dayjs().year(year).month(month).date(1);
  return new Intl.DateTimeFormat(locale, {
    month: options.short ? 'short' : 'long',
  }).format(parsedValue.toDate());
};

export const getCombinedMonthYearLabel = (year, month, locale = 'en-US') => {
  const parsedValue = dayjs().year(year).month(month).date(1);
  return new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
  }).format(parsedValue.toDate());
};

export const getWeekdayLabels = (locale = 'en-US') => {
  const localeKey = resolveDayjsLocale(locale);
  const baseDate = dayjs().locale(localeKey);
  const firstDayOfWeek = baseDate.localeData().firstDayOfWeek();

  return Array.from({ length: 7 }, (_, index) => {
    const labelDate = baseDate.weekday(firstDayOfWeek + index);
    return new Intl.DateTimeFormat(locale, { weekday: 'narrow' }).format(labelDate.toDate());
  });
};

export const isDateAllowed = (date, constraints = {}) => {
  if (!date) {
    return false;
  }

  const { min, max, isDateDisabled } = constraints;
  const minDate = parseModelValue(min);
  const maxDate = parseModelValue(max);

  if (minDate && date.isBefore(minDate, 'day')) {
    return false;
  }

  if (maxDate && date.isAfter(maxDate, 'day')) {
    return false;
  }

  if (typeof isDateDisabled === 'function' && isDateDisabled(toIso(date))) {
    return false;
  }

  return true;
};

export const findNearestAllowedDate = (date, direction = 1, constraints = {}, maxSteps = 366) => {
  if (!date) {
    return null;
  }

  if (isDateAllowed(date, constraints)) {
    return date;
  }

  const stepDirection = direction >= 0 ? 1 : -1;
  let cursor = date;

  for (let step = 0; step < maxSteps; step += 1) {
    cursor = cursor.add(stepDirection, 'day').startOf('day');
    if (isDateAllowed(cursor, constraints)) {
      return cursor;
    }
  }

  return null;
};

export const isMonthAllowed = (year, month, constraints = {}) => {
  const startOfMonth = dayjs().year(year).month(month).date(1).startOf('day');
  const totalDays = startOfMonth.daysInMonth();

  for (let day = 1; day <= totalDays; day += 1) {
    const currentDay = startOfMonth.date(day);
    if (isDateAllowed(currentDay, constraints)) {
      return true;
    }
  }

  return false;
};

export const isYearAllowed = (year, constraints = {}) => {
  for (let month = 0; month < 12; month += 1) {
    if (isMonthAllowed(year, month, constraints)) {
      return true;
    }
  }

  return false;
};

export const getYearRange = (visibleYear, constraints = {}) => {
  const minDate = parseModelValue(constraints.min);
  const maxDate = parseModelValue(constraints.max);
  const minYear = minDate ? minDate.year() : visibleYear - 100;
  const maxYear = maxDate ? maxDate.year() : visibleYear + 100;

  return Array.from({ length: maxYear - minYear + 1 }, (_, index) => minYear + index);
};

export const getMonthOptions = (visibleYear, locale = 'en-US', constraints = {}) => {
  return Array.from({ length: 12 }, (_, month) => ({
    value: month,
    label: formatMonthLabel(visibleYear, month, locale),
    disabled: !isMonthAllowed(visibleYear, month, constraints),
  }));
};

export const getYearOptions = (visibleYear, constraints = {}) => {
  return getYearRange(visibleYear, constraints).map((year) => ({
    value: year,
    label: `${year}`,
    disabled: !isYearAllowed(year, constraints),
  }));
};

export const buildMonthGrid = ({
  year,
  month,
  locale = 'en-US',
  selectedIso = null,
  focusedIso = null,
  constraints = {},
  rangeStartIso = null,
  rangeEndIso = null,
  previewRangeEndIso = null,
}) => {
  const localeKey = resolveDayjsLocale(locale);
  const monthStart = dayjs().locale(localeKey).year(year).month(month).date(1).startOf('day');
  const monthEnd = monthStart.endOf('month').startOf('day');
  const firstDayOfWeek = monthStart.localeData().firstDayOfWeek();
  const lastDayOfWeek = (firstDayOfWeek + 6) % 7;

  let gridStart = monthStart.weekday(firstDayOfWeek);
  if (gridStart.isAfter(monthStart, 'day')) {
    gridStart = gridStart.subtract(1, 'week');
  }

  let gridEnd = monthEnd.weekday(lastDayOfWeek);
  if (gridEnd.isBefore(monthEnd, 'day')) {
    gridEnd = gridEnd.add(1, 'week');
  }

  const selectedDate = parseModelValue(selectedIso);
  const focusedDate = parseModelValue(focusedIso);
  const parsedRange = sortRangeDates(parseModelValue(rangeStartIso), parseModelValue(rangeEndIso));
  const previewRange = parsedRange.end
    ? { start: null, end: null }
    : sortRangeDates(parsedRange.start, parseModelValue(previewRangeEndIso));
  const days = [];
  let cursor = gridStart;

  while (cursor.isBefore(gridEnd, 'day') || cursor.isSame(gridEnd, 'day')) {
    const iso = toIso(cursor);
    const isCurrentMonth = cursor.month() === month && cursor.year() === year;
    const allowed = isDateAllowed(cursor, constraints);
    const isRangeStart = !!parsedRange.start && cursor.isSame(parsedRange.start, 'day');
    const isRangeEnd = !!parsedRange.end && cursor.isSame(parsedRange.end, 'day');
    const isInRange = !!parsedRange.start
      && !!parsedRange.end
      && cursor.isAfter(parsedRange.start, 'day')
      && cursor.isBefore(parsedRange.end, 'day');
    const isPreviewRangeEnd = !!previewRange.start
      && !!previewRange.end
      && !parsedRange.end
      && cursor.isSame(previewRange.end, 'day');
    const isPreviewInRange = !!previewRange.start
      && !!previewRange.end
      && !parsedRange.end
      && cursor.isAfter(previewRange.start, 'day')
      && cursor.isBefore(previewRange.end, 'day');
    days.push({
      iso,
      label: cursor.date(),
      isCurrentMonth,
      isToday: cursor.isToday(),
      isSelected: (!!selectedDate && cursor.isSame(selectedDate, 'day')) || isRangeStart || isRangeEnd,
      isFocused: !!focusedDate && cursor.isSame(focusedDate, 'day'),
      isDisabled: !allowed || !isCurrentMonth,
      isRangeStart,
      isRangeEnd,
      isInRange,
      isPreviewInRange,
      isPreviewRangeEnd,
    });
    cursor = cursor.add(1, 'day');
  }

  return days;
};

export const findFirstFocusableDate = ({ year, month, selectedIso = null, constraints = {} }) => {
  const selectedDate = parseModelValue(selectedIso);
  if (selectedDate && selectedDate.year() === year && selectedDate.month() === month && isDateAllowed(selectedDate, constraints)) {
    return toIso(selectedDate);
  }

  const monthStart = dayjs().year(year).month(month).date(1).startOf('day');
  const totalDays = monthStart.daysInMonth();
  for (let day = 1; day <= totalDays; day += 1) {
    const currentDay = monthStart.date(day);
    if (isDateAllowed(currentDay, constraints)) {
      return toIso(currentDay);
    }
  }

  return null;
};

export const shiftMonth = ({ year, month }, amount) => {
  const shifted = dayjs().year(year).month(month).date(1).add(amount, 'month');
  return {
    year: shifted.year(),
    month: shifted.month(),
  };
};

export const canNavigateMonth = ({ year, month }, amount, constraints = {}) => {
  const next = shiftMonth({ year, month }, amount);
  return isMonthAllowed(next.year, next.month, constraints);
};

export const canNavigateYear = (year, amount, constraints = {}) => {
  return isYearAllowed(year + amount, constraints);
};

export const moveFocusDate = (focusedIso, amount, unit, constraints = {}) => {
  const baseDate = parseModelValue(focusedIso) || dayjs().startOf('day');
  const candidate = baseDate.add(amount, unit).startOf('day');
  const direction = amount >= 0 ? 1 : -1;
  return findNearestAllowedDate(candidate, direction, constraints) || baseDate;
};

export default dayjs;
