export const isDefined = <T>(value: T | undefined): value is T =>
  typeof value !== 'undefined';

export const isNil = (value: any): value is undefined | null =>
  typeof value === 'undefined' || value === null;

export const isBoolean = (value: any): value is boolean =>
  typeof value === 'boolean';

// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (value: any): value is Function =>
  !!(value && {}.toString.call(value) == '[object Function]');

export const isString = (value: any): value is string =>
  typeof value === 'string';

export const isNumber = (value: any): value is number =>
  typeof value === 'number';

export const isPrimitive = (value: any): value is string | number | boolean =>
  /^(b|st|n)/.test(typeof value);

export const isEmptyObject = (value: any): value is Record<string, never> =>
  !!value && Object.keys(value).length === 0 && value.constructor === Object;

export type Empty =
  | Array<never>
  | Record<string, never>
  | ''
  | undefined
  | null;

export function isEmptyValue<T>(value: T | Empty): value is Empty {
  return (
    isNil(value) ||
    ((isString(value) || Array.isArray(value)) && value.length === 0) ||
    isEmptyObject(value)
  );
}
