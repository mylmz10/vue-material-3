import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import 'dayjs/locale/en';
import 'dayjs/locale/tr';

dayjs.extend(customParseFormat);

export const MODEL_FORMAT = 'HH:mm';
export const DEFAULT_DISPLAY_FORMAT = 'hh:mm A';
export const DIAL_SIZE = 256;
export const DIAL_HANDLE_SIZE = 48;
export const DIAL_CENTER_SIZE = 8;
export const DIAL_LABEL_STEP = 5;
export const HOUR_CYCLE_12 = 12;
export const HOUR_CYCLE_24 = 24;

const SUPPORTED_DAYJS_LOCALES = new Set(['en', 'tr']);

export const resolveDayjsLocale = (locale = 'en-US') => {
  const baseLocale = `${locale}`.toLowerCase().replace('_', '-').split('-')[0];
  return SUPPORTED_DAYJS_LOCALES.has(baseLocale) ? baseLocale : 'en';
};

export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
export const normalizeHourCycle = (hourCycle = HOUR_CYCLE_12) => (`${hourCycle}` === '24' ? HOUR_CYCLE_24 : HOUR_CYCLE_12);

export const padTwo = (value) => `${value}`.padStart(2, '0');

export const parseModelValue = (value) => {
  if (!value) {
    return null;
  }

  const parsed = dayjs(value, MODEL_FORMAT, true);
  return parsed.isValid() ? parsed.second(0).millisecond(0) : null;
};

export const getDefaultTime = () => {
  const now = dayjs().second(0).millisecond(0);
  const roundedMinute = Math.round(now.minute() / 5) * 5;
  const normalized = roundedMinute === 60 ? now.add(1, 'hour').minute(0) : now.minute(roundedMinute);
  return normalized.second(0).millisecond(0);
};

export const toModelValue = (value) => {
  if (!value) {
    return null;
  }

  const hour = Number.isFinite(value.hour24) ? clamp(value.hour24, 0, 23) : 0;
  const minute = Number.isFinite(value.minute) ? clamp(value.minute, 0, 59) : 0;
  return dayjs().hour(hour).minute(minute).second(0).millisecond(0).format(MODEL_FORMAT);
};

export const toDisplayParts = (value) => {
  if (value && typeof value === 'object' && Number.isFinite(value.hour24) && Number.isFinite(value.minute)) {
    const hour24 = clamp(value.hour24, 0, 23);
    const minute = clamp(value.minute, 0, 59);
    const meridiem = hour24 >= 12 ? 'PM' : 'AM';
    const hour12 = hour24 % 12 || 12;

    return {
      hour24,
      hour12,
      minute,
      meridiem,
    };
  }

  const parsedValue = typeof value === 'string' ? parseModelValue(value) : value;
  const baseValue = parsedValue || getDefaultTime();
  const hour24 = baseValue.hour();
  const minute = baseValue.minute();
  const meridiem = hour24 >= 12 ? 'PM' : 'AM';
  const hour12 = hour24 % 12 || 12;

  return {
    hour24,
    hour12,
    minute,
    meridiem,
  };
};

export const to24Hour = (hour12, meridiem = 'AM') => {
  const normalizedHour = clamp(Number(hour12) || 12, 1, 12);
  const normalizedMeridiem = `${meridiem}`.toUpperCase() === 'PM' ? 'PM' : 'AM';

  if (normalizedMeridiem === 'AM') {
    return normalizedHour === 12 ? 0 : normalizedHour;
  }

  return normalizedHour === 12 ? 12 : normalizedHour + 12;
};

export const withHour = (value, hourValue, meridiem, hourCycle = HOUR_CYCLE_12) => {
  const parts = toDisplayParts(value);
  const resolvedHourCycle = normalizeHourCycle(hourCycle);
  return {
    hour24: resolvedHourCycle === HOUR_CYCLE_24
      ? clamp(Number(hourValue) || 0, 0, 23)
      : to24Hour(hourValue, meridiem ?? parts.meridiem),
    minute: parts.minute,
  };
};

export const withMinute = (value, minute) => {
  const parts = toDisplayParts(value);
  return {
    hour24: parts.hour24,
    minute: clamp(Number(minute) || 0, 0, 59),
  };
};

export const withMeridiem = (value, meridiem) => {
  const parts = toDisplayParts(value);
  return {
    hour24: to24Hour(parts.hour12, meridiem),
    minute: parts.minute,
  };
};

export const formatDisplayValue = (value, locale = 'en-US', hourCycle = HOUR_CYCLE_12) => {
  const parsedValue = typeof value === 'string' ? parseModelValue(value) : value;
  const baseValue = parsedValue || getDefaultTime();
  const resolvedHourCycle = normalizeHourCycle(hourCycle);

  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: resolvedHourCycle === HOUR_CYCLE_12,
  }).format(baseValue.toDate());
};

export const getDayPeriodLabels = (locale = 'en-US') => {
  const formatter = new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    hour12: true,
  });

  const resolveLabel = (date) => formatter.formatToParts(date).find((part) => part.type === 'dayPeriod')?.value?.toUpperCase() || '';

  return {
    am: resolveLabel(new Date(2026, 0, 1, 9, 0)),
    pm: resolveLabel(new Date(2026, 0, 1, 21, 0)),
  };
};

export const getHourDialOptions = (hourCycle = HOUR_CYCLE_12) => {
  const resolvedHourCycle = normalizeHourCycle(hourCycle);

  if (resolvedHourCycle === HOUR_CYCLE_24) {
    return [
      ...Array.from({ length: 12 }, (_, index) => ({
        value: index,
        label: index === 0 ? '00' : `${index}`,
        angle: index * 30,
        ring: 'outer',
      })),
      ...Array.from({ length: 12 }, (_, index) => ({
        value: index + 12,
        label: `${index + 12}`,
        angle: index * 30,
        ring: 'inner',
      })),
    ];
  }

  return Array.from({ length: 12 }, (_, index) => {
    const value = index === 0 ? 12 : index;
    return {
      value,
      label: `${value}`,
      angle: index * 30,
      ring: 'outer',
    };
  });
};

export const getMinuteDialOptions = () => {
  return Array.from({ length: 12 }, (_, index) => {
    const value = index * DIAL_LABEL_STEP;
    return {
      value,
      label: padTwo(value),
      angle: value * 6,
    };
  });
};

export const angleToPoint = (angle, radius, center = DIAL_SIZE / 2) => {
  const radians = (angle - 90) * (Math.PI / 180);
  return {
    x: center + Math.cos(radians) * radius,
    y: center + Math.sin(radians) * radius,
  };
};

export const getDialAngleForValue = (mode, value, hourCycle = HOUR_CYCLE_12) => {
  if (mode === 'minute') {
    return clamp(Number(value) || 0, 0, 59) * 6;
  }

  const resolvedHourCycle = normalizeHourCycle(hourCycle);
  if (resolvedHourCycle === HOUR_CYCLE_24) {
    return (clamp(Number(value) || 0, 0, 23) % 12) * 30;
  }

  const normalizedValue = Number(value) || 12;
  const dialValue = normalizedValue === 12 ? 0 : normalizedValue;
  return dialValue * 30;
};

export const getClosestDialValue = (mode, angle, pointerDistance = 0, hourCycle = HOUR_CYCLE_12, outerRadius = 0, innerRadius = 0) => {
  const normalizedAngle = ((angle % 360) + 360) % 360;

  if (mode === 'minute') {
    const minute = Math.round(normalizedAngle / 6) % 60;
    return minute;
  }

  const resolvedHourCycle = normalizeHourCycle(hourCycle);
  if (resolvedHourCycle === HOUR_CYCLE_24) {
    const outerHour = Math.round(normalizedAngle / 30) % 12;
    const selectionThreshold = outerRadius && innerRadius ? (outerRadius + innerRadius) / 2 : 0;
    return pointerDistance < selectionThreshold ? outerHour + 12 : outerHour;
  }

  const hourIndex = Math.round(normalizedAngle / 30) % 12;
  return hourIndex === 0 ? 12 : hourIndex;
};

export const getDialAngleFromPointer = (event, element) => {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const dx = event.clientX - centerX;
  const dy = event.clientY - centerY;
  const rawAngle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
  return rawAngle < 0 ? rawAngle + 360 : rawAngle;
};

export const getDialDistanceFromPointer = (event, element) => {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const dx = event.clientX - centerX;
  const dy = event.clientY - centerY;
  return Math.sqrt((dx ** 2) + (dy ** 2));
};

export const sanitizeHourInput = (value) => `${value}`.replace(/\D/g, '').slice(0, 2);
export const sanitizeMinuteInput = (value) => `${value}`.replace(/\D/g, '').slice(0, 2);

export const parseInputSegments = (hourText, minuteText, meridiem = 'AM', hourCycle = HOUR_CYCLE_12) => {
  if (!hourText || !minuteText) {
    return null;
  }

  const resolvedHourCycle = normalizeHourCycle(hourCycle);
  const hour = Number(hourText);
  const minute = Number(minuteText);

  if (!Number.isInteger(hour)) {
    return null;
  }

  if (resolvedHourCycle === HOUR_CYCLE_24) {
    if (hour < 0 || hour > 23) {
      return null;
    }
  } else if (hour < 1 || hour > 12) {
    return null;
  }

  if (!Number.isInteger(minute) || minute < 0 || minute > 59) {
    return null;
  }

  return {
    hour24: resolvedHourCycle === HOUR_CYCLE_24 ? hour : to24Hour(hour, meridiem),
    minute,
  };
};

export const formatInputSegments = (value, hourCycle = HOUR_CYCLE_12) => {
  const parts = toDisplayParts(value);
  const resolvedHourCycle = normalizeHourCycle(hourCycle);
  return {
    hour: padTwo(resolvedHourCycle === HOUR_CYCLE_24 ? parts.hour24 : parts.hour12),
    minute: padTwo(parts.minute),
    meridiem: parts.meridiem,
  };
};
