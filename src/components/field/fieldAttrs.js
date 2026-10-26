// Keep layout styling on the wrapper; forward control attributes to the input.
export const getControlAttrs = (attrs) => Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class' && key !== 'style'));
