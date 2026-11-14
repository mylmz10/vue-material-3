import { describe, expect, it } from 'vitest';
import { createCarouselLayout, createHeroLayout, getCarouselMask } from '@/components/carousel/carouselLayout';

const masksAt = (layout, count, offset) => {
  const step = layout.large + layout.gap;
  const max = Math.max(0, count * step - layout.gap - layout.available);
  return Array.from({ length: count }, (_, index) => getCarouselMask(layout, index * step + layout.large / 2 - offset, offset, max));
};

describe('carousel keylines', () => {
  it.each([328, 968, 1068])('packs large, medium and small items into %spx', (available) => {
    const layout = createCarouselLayout(available, 360, 8, 8);
    const masks = masksAt(layout, 8, 0).filter((mask) => mask.center - mask.width / 2 >= -0.1 && mask.center + mask.width / 2 <= available + 0.1);
    expect(layout.large).toBeLessThanOrEqual(360);
    expect(layout.large).toBeGreaterThan(layout.medium);
    expect(layout.medium).toBeGreaterThan(layout.small);
    expect(masks[0].width).toBeCloseTo(layout.large);
    expect(masks.at(-2).width).toBeCloseTo(layout.medium);
    expect(masks.at(-1).width).toBe(48);
    expect(masks[0].center - masks[0].width / 2).toBeCloseTo(0);
    expect(masks.at(-1).center + masks.at(-1).width / 2).toBeCloseTo(available);
    for (let index = 1; index < masks.length; index++) {
      expect(masks[index].center - masks[index].width / 2 - masks[index - 1].center - masks[index - 1].width / 2).toBeCloseTo(8);
    }
  });
  it.each([328, 968])('ends with a full last item at the trailing edge for %spx', (available) => {
    const layout = createCarouselLayout(available, 360, 8, 8);
    const max = 8 * (layout.large + layout.gap) - layout.gap - available;
    const masks = masksAt(layout, 8, max);
    expect(masks.at(-1).width).toBeCloseTo(layout.large);
    expect(masks.at(-1).center + masks.at(-1).width / 2).toBeCloseTo(available);
    const visible = masks.filter((mask) => mask.center - mask.width / 2 >= -0.1 && mask.center + mask.width / 2 <= available + 0.1);
    expect(visible[0].width).toBeCloseTo(48);
    expect(visible[1].width).toBeCloseTo(layout.medium);
    expect(visible[0].center - visible[0].width / 2).toBeCloseTo(0);
  });
  it('interpolates widths between snap positions without changing the logical item width', () => {
    const layout = createCarouselLayout(968, 360, 8, 8);
    const large = layout.large;
    const start = masksAt(layout, 8, 0);
    const half = masksAt(layout, 8, (large + 8) / 2);
    const index = start.findIndex((mask) => mask.width === layout.medium);
    expect(half[index].width).toBeGreaterThan(layout.medium);
    expect(half[index].width).toBeLessThan(large);
    expect(layout.large).toBe(large);
  });
  it.each([0, 1, 2, 3])('fits %s items without inventing preview slots', (count) => {
    const layout = createCarouselLayout(968, 360, 8, count);
    expect(layout.fits).toBe(true);
    expect(layout.keylines).toEqual([]);
    expect(layout.large).toBeGreaterThan(0);
    expect(layout.large * count + 8 * Math.max(0, count - 1)).toBeLessThanOrEqual(968);
  });
  it('falls back to one full item in a very narrow container', () => {
    const layout = createCarouselLayout(200, 360, 8, 8);
    expect(layout.large).toBe(200);
    expect(layout.keylines).toEqual([]);
  });

  it.each([2, 3, 6])('shows one focal item and fits the previews at each snap with %s items', (count) => {
    const available = 542;
    const layout = createHeroLayout(available, 8, count);
    const step = layout.large + layout.gap;
    const max = (count - 1) * step - layout.preview;
    for (let index = 0; index < count; index++) {
      const masks = masksAt(layout, count, Math.min(index * step, max));
      const visible = masks.filter(({ center, width }) => center - width / 2 >= -0.1 && center + width / 2 <= available + 0.1);
      const widths = Array(Math.min(count, 3)).fill(48);
      const focalPosition = index === count - 1 ? widths.length - 1 : Math.min(index, 1);
      widths[focalPosition] = layout.large;
      expect(visible.map(({ width }) => width)).toEqual(widths);
      expect(masks[index].width).toBe(layout.large);
      expect(visible[0].center - visible[0].width / 2).toBeCloseTo(0);
      expect(visible.at(-1).center + visible.at(-1).width / 2).toBeCloseTo(available);
    }
  });

  it('uses the available width when hero has no room for previews', () => {
    expect(createHeroLayout(180, 8, 4)).toMatchObject({ large: 180, keylines: [] });
    expect(createHeroLayout(542, 8, 1)).toMatchObject({ large: 542, keylines: [] });
  });
});
