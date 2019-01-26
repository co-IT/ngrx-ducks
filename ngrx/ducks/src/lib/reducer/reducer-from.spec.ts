import { NoInitialValueError, throwIf } from '../errors';
import { nullOrUndefined } from '../validators';

class Plain {}

describe('reducerFrom', () => {
  describe('When the target has no initial value', () => {
    it('should emit an error', () => {
      const error = new NoInitialValueError(createFrom.name, Plain.name);
      expect(() => createFrom(Plain)).toThrowError(error);
    });
  });
});

function createFrom<T extends new () => InstanceType<T>>(Token: T) {
  const instance: { initialState?: unknown } = new Token();
  const initialState = instance.initialState;

  throwIf(
    nullOrUndefined(initialState),
    new NoInitialValueError(createFrom.name, Token.name)
  );
}
