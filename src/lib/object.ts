/* eslint-disable @typescript-eslint/ban-types */
import { isDefined } from './type-guard';

export function pick<T extends {}, KeysToPick extends keyof T>(
  oriObject: T,
  keysToPick: KeysToPick[]
): Pick<T, KeysToPick> {
  const result = {} as Pick<T, KeysToPick>;

  keysToPick.forEach((key) => {
    const value = oriObject[key];
    if (isDefined(value)) {
      result[key] = value;
    }
  });

  return result;
}

export function omit<T extends {}, KeysToOmit extends keyof T>(
  oriObject: T,
  keysToOmit: KeysToOmit[]
): Omit<T, KeysToOmit> {
  const result = Object.assign({}, oriObject);

  keysToOmit.forEach((key) => delete result[key]);

  return result;
}

/**
 * Combination of `pick` and `omit` operation.
 * @param oriObject
 * @param keys keys to included in the `picked` property and excluded from the `omitted` property in the result.
 */
export function pickAndOmit<T extends {}, Keys extends keyof T>(
  oriObject: T,
  keys: readonly Keys[]
): { picked: Pick<T, Keys>; omitted: Omit<T, Keys> } {
  const pick = {} as Pick<T, Keys>;
  const omit = Object.assign({}, oriObject);

  keys.forEach((key) => {
    const value = oriObject[key];
    if (isDefined(value)) {
      pick[key] = value;
    }
    delete omit[key];
  });

  return {
    picked: pick,
    omitted: omit,
  };
}
