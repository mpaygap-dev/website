import { featureCheck } from './feature-check';
import { isNil } from './type-guard';
// no point adding big mapping if we
// only support MYR now
const currencyMap: Record<string, string> = {
  MYR: 'RM',
};

const commaPositionRegex = /\B(?=(\d{3})+(?!\d))/g;

export const getDisplayedCurrency = (currency: string) =>
  currencyMap[currency] || currency;

export function insertThousandSeparator(number: string | number): string {
  const numString = String(number);
  if (numString.includes('.')) {
    const [integer, decimal] = numString.split('.');
    return `${integer.replace(commaPositionRegex, ',')}.${decimal}`;
  }
  return numString.replace(commaPositionRegex, ',');
}

export interface FormatMoneyOptions {
  currency?: string;
  minDecimal?: number;
  maxDecimal?: number;
}

const numberFormatters: Record<string, Intl.NumberFormat> = {};

/**
 *
 * @param value the number value that you wish to format
 * @param currency can be 'MYR'
 */
export const formatMoney = (
  value: string | number | undefined | null,
  { minDecimal = 0, maxDecimal = 2, currency = '' }: FormatMoneyOptions = {}
): string => {
  if (isNil(value)) {
    return '';
  }

  const numValue = typeof value === 'number' ? value : Number(value);

  let displayValue = '';

  if (isNaN(numValue)) {
    return value as string;
  }

  if (featureCheck.intlNumberFormat) {
    const cacheKey = `${minDecimal}-${maxDecimal}`;
    if (!numberFormatters[cacheKey]) {
      numberFormatters[cacheKey] = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: minDecimal,
        maximumFractionDigits: maxDecimal,
      });
    }

    displayValue = numberFormatters[cacheKey].format(numValue);
  } else {
    displayValue = insertThousandSeparator(numValue.toFixed(maxDecimal));
  }

  const currencyDisplay = getDisplayedCurrency(currency);

  return currencyDisplay ? `${currencyDisplay} ${displayValue}` : displayValue;
};

export const formatPercent = (
  value: string | number | undefined | null,
  options?: Omit<FormatMoneyOptions, 'currency'>
) => {
  if (isNil(value)) {
    return value;
  }

  return `${formatMoney(value, options)} %`;
};
