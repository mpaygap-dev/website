export const featureCheck = {
  intlNumberFormat: !!(
    Intl &&
    typeof Intl === 'object' &&
    typeof Intl.NumberFormat === 'function'
  ),
};
