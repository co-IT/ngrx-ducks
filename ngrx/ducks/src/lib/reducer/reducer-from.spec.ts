import {
  WithInitialState,
  WithInternalMethodCallRedirect
} from '../../../test/mocks';
import { NoInitialValueError } from '../errors';
import { reducerFrom } from './reducer-from';

describe('reducerFrom', () => {
  describe('When the target has no initial value', () => {
    class Plain {}

    it('should raise an error', () => {
      const error = new NoInitialValueError(reducerFrom.name, Plain.name);
      expect(() => reducerFrom(Plain)).toThrowError(error);
    });
  });

  describe('When a "Duck" provide an Action', () => {
    const incrementActionType = 'increment count';

    it('should create the reducer function from it', () => {
      const reducer = reducerFrom(WithInitialState);
      expect(reducer).toBeInstanceOf(Function);
    });

    it('should process an action', () => {
      const reducer = reducerFrom(WithInitialState);
      const countState = reducer(undefined, { type: incrementActionType });

      expect(countState).toBe(1);
    });
  });

  describe('When a "Duck" redirects one action another other', () => {
    it('should work as expected', () => {
      const reducer = reducerFrom(WithInternalMethodCallRedirect);
      const countState = reducer(undefined, { type: 'alias increment' });

      expect(countState).toBe(1);
    });
  });
});
