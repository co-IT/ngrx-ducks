import { NgrxDucksError, throwIf } from '../errors';

function InitialState<T>(value: T) {
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

describe('@InitialState<T>', () => {
  describe('When no value is provided', () => {
    it('should emit an error', () => {
      const error = new NgrxDucksError(
        `@${InitialState.name}: Passing "null" or "undefined" is not allowed.`
      );

      expect(() => InitialState(null)).toThrowError(error);
    });
  });

  describe('When an empty string is given', () => {
    it('should be allowed', () => {
      expect(() => InitialState('')).not.toThrow();
    });
  });

  describe('When a class is annotated', () => {
    it('should have the passed "initialState"', () => {
      @InitialState(0)
      class Some {}

      const instance = new Some();

      expect((instance as any).initialState).toBe(0);
    });
  });
});
