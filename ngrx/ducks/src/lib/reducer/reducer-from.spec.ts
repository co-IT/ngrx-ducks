import { Action, InitialState } from '../decorators';
import { NoInitialValueError, throwIf } from '../errors';
import { nullOrUndefined } from '../validators';

describe('reducerFrom', () => {
  describe('When the target has no initial value', () => {
    class Plain {}

    it('should raise an error', () => {
      const error = new NoInitialValueError(createFrom.name, Plain.name);
      expect(() => createFrom(Plain)).toThrowError(error);
    });
  });

  describe('When a "Duck" provide an Action', () => {
    @InitialState(0)
    class Duck {
      @Action('increment count')
      increment(state: number) {
        return state++;
      }
    }
    it('should create the reducer function from it', () => {
      const reducer = createFrom(Duck);
      expect(reducer).toBeInstanceOf(Function);
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

  return function() {
    /* */
  };
}
