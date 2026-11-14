const between = (value, min, max) => Math.max(min, Math.min(max, value));

// Keylines describe visible centers and widths; the native scroll track stays uniform.
export function createCarouselLayout(available, preferredWidth, gap, count) {
  const small = Math.min(48, available);
  const largeCount = Math.max(1, Math.ceil((available - small - gap - preferredWidth * 0.6) / (preferredWidth + gap)));
  const fits = count < largeCount + 2;
  if (fits || available < 288) {
    const large = fits ? Math.min(preferredWidth, Math.max(1, (available - gap * (count - 1)) / Math.max(1, count))) : available;
    return { available, large, medium: large, small, gap, preview: 0, keylines: [], fits };
  }
  const large = (available - small - (largeCount + 1) * gap) / (largeCount + 0.6);
  const medium = large * 0.6;
  const step = large + gap;
  const keylines = [
    { offset: large / 2 - step * 2, center: -medium - gap * 2 - small / 2, width: small },
    { offset: large / 2 - step, center: -gap - medium / 2, width: medium },
  ];
  for (let index = 0; index < largeCount; index++) keylines.push({ offset: large / 2 + index * step, center: large / 2 + index * step, width: large });
  keylines.push(
    { offset: large / 2 + largeCount * step, center: largeCount * step + medium / 2, width: medium },
    { offset: large / 2 + (largeCount + 1) * step, center: available - small / 2, width: small },
    { offset: large / 2 + (largeCount + 2) * step, center: available + gap + small / 2, width: small }
  );
  return { available, large, medium, small, gap, preview: medium + small + 2 * gap, keylines, fits: false };
}

export function getCarouselMask(layout, rawCenter, offset, maxOffset) {
  const { available, large, small, gap, preview, keylines } = layout;
  if (!keylines.length) return { center: rawCenter, width: large };
  const endShift = between(preview - (maxOffset - offset), 0, preview);
  const shift = layout.centered ? endShift / 2 - between(preview / 2 - offset, 0, preview / 2) : endShift;
  const position = rawCenter - endShift;
  let before = keylines[0];
  let after = keylines[keylines.length - 1];
  if (position < before.offset) return { center: before.center + ((position - before.offset) / (large + gap)) * (small + gap) + shift, width: small };
  if (position > after.offset) return { center: after.center + ((position - after.offset) / (large + gap)) * (small + gap) + shift, width: small };
  for (let index = 1; index < keylines.length; index++) {
    if (position <= keylines[index].offset) {
      before = keylines[index - 1];
      after = keylines[index];
      break;
    }
  }
  const progress = (position - before.offset) / (after.offset - before.offset);
  return {
    center: before.center + (after.center - before.center) * progress + shift,
    width: Math.min(available, before.width + (after.width - before.width) * progress),
  };
}

export function createHeroLayout(available, gap, count) {
  const small = 48;
  const preview = small + gap;
  const previewCount = Math.min(2, count - 1);
  const large = available - previewCount * preview;
  if (count < 2 || large < 2 * small + gap) return { available, large: available, gap, keylines: [] };

  const centered = count > 2;
  const focalCenter = large / 2;
  const center = focalCenter + (centered ? preview : 0);
  const step = large + gap;
  const keylines = [-2, -1, 0, 1, 2].map((index) => ({
    offset: focalCenter + index * step,
    center: index === 0 ? center : center + Math.sign(index) * ((large - small) / 2 + Math.abs(index) * preview),
    width: index === 0 ? large : small,
  }));
  return { available, large, medium: large, small, gap, keylines, preview: previewCount * preview, centered };
}
