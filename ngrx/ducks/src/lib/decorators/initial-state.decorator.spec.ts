import { NgrxDucksError } from '../core/errors';
import { throwIf } from '../core/validation';

function InitialState<T>(value: T) {
  throwIf(
    value === null || value === undefined,
    `@${InitialState.name}: Passing "null" or "undefined" is not allowed.`
  );
}

describe('@InitialState<T>', () => {
  describe('When no value is provided', () => {
    it('should emit an error', () => {
      const error = new NgrxDucksError(
        `@${InitialState.name}: Passing "null" or "undefined" is not allowed.`
      );

      expect(() => InitialState(null)).toThrowError(error.message);
    });
  });
});
