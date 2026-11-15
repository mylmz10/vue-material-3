// @vitest-environment node
import { execFileSync } from 'node:child_process';
import process from 'node:process';
import { expect, it } from 'vitest';
import { parseModelValue } from '@/components/timepicker/timePickerUtils';

it('only parses valid zero-padded HH:mm model values', () => {
  expect(parseModelValue('00:00')).toEqual({ hour24: 0, minute: 0 });
  expect(parseModelValue('23:59')).toEqual({ hour24: 23, minute: 59 });
  for (const value of [null, '2:30', '24:00', '02:60', '02:30\n']) expect(parseModelValue(value)).toBeNull();
});

it('preserves 02:30 on a spring-forward day that skips 2 AM', () => {
  const utils = new URL('../../../../src/components/timepicker/timePickerUtils.js', import.meta.url);
  expect(() =>
    execFileSync(
      process.execPath,
      [
        '--experimental-default-type=module',
        '--input-type=module',
        '--eval',
        `
          import assert from 'node:assert/strict';
          import { formatDisplayValue, getDefaultTime, parseModelValue, toModelValue } from ${JSON.stringify(utils.href)};

          const DateConstructor = Date;
          const currentTime = new DateConstructor('2026-03-08T16:02:00Z').getTime();
          globalThis.Date = class extends DateConstructor {
            constructor(...args) { super(...(args.length ? args : [currentTime])); }
            static now() { return currentTime; }
          };

          assert.equal(new Date(2026, 2, 8, 2, 30).getHours(), 3);
          const parts = { hour24: 2, minute: 30 };
          assert.deepEqual(parseModelValue('02:30'), parts);
          assert.equal(toModelValue(parts), '02:30');
          assert.equal(formatDisplayValue('02:30', 'en-US', 24), '02:30');
          assert.deepEqual(getDefaultTime(), { hour24: 12, minute: 0 });
        `,
      ],
      { env: { ...process.env, TZ: 'America/New_York' } }
    )
  ).not.toThrow();
});
