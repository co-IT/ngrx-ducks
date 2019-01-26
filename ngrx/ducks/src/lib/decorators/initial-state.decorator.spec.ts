import { methodsFrom } from '../class';
import { NgrxDucksError } from '../errors';
import { InitialState } from './initial-state.decorator';

describe('@InitialState<T>', () => {
  describe('When no value is provided', () => {
    it('should raise an error', () => {
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

  describe('When a class contains a method', () => {
    it('should preserve it', () => {
      @InitialState(0)
      class Some {
        greet() {
          /** */
        }
      }

      expect(methodsFrom(Some)).toContain('greet');
    });
  });
});
