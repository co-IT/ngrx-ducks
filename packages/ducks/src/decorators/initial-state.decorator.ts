import { NgrxDucksError, throwIf } from '../errors';

/**
 * Add property __initialState__ to annotated class
 * This is used to create the reducer automatically later on with reducerFrom.
 *
 * @param value initial values
 * @todo Remove any | There must be a better solution
 */
export function InitialState<T>(value: T) {
  throwIf(
    value === null || value === undefined,
    new NgrxDucksError(
      `@${InitialState.name}: Passing "null" or "undefined" is not allowed.`
    )
  );
  return function(target: new () => any) {
    target.prototype.__initialState__ = value;
    return target;
  };
}
