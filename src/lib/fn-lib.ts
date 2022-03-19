export interface Callback<Args extends any[]> {
  (...args: Args): void;
}

export function callAll<Args extends any[]>(
  ...fns: Array<Callback<Args> | undefined | boolean | null>
): Callback<Args> {
  return function callAllFns() {
    // eslint-disable-next-line prefer-rest-params
    const arg = arguments;
    fns.forEach(
      // eslint-disable-next-line prefer-spread
      (fn) => typeof fn === 'function' && fn.apply(null, arg as any as Args)
    );
  };
}

export function noop() {
  // noop
}
