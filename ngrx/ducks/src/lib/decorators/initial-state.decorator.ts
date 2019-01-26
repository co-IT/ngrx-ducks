import { NgrxDucksError, throwIf } from '../errors';
export function InitialState<T>(value: T) {
  throwIf(
    value === null || value === undefined,
    new NgrxDucksError(
      `@${InitialState.name}: Passing "null" or "undefined" is not allowed.`
    )
  );
  return function(target) {
    return class extends target {
      initialState = value;
    };
  };
}
