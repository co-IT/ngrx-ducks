import { methodsFrom } from '../class';
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
    const incrementActionType = 'increment count';

    @InitialState(0)
    class Counter {
      @Action(incrementActionType)
      increment(state: number) {
        return ++state;
      }
    }

    it('should create the reducer function from it', () => {
      const reducer = createFrom(Counter);
      expect(reducer).toBeInstanceOf(Function);
    });

    it('should process an action', () => {
      const reducer = createFrom(Counter);
      const countState = reducer(undefined, { type: incrementActionType });

      expect(countState).toBe(1);
    });
  });
});

export interface ActionThatMayHaveAPayload<TPayload = unknown> {
  type: string;
  payload?: TPayload;
}

export interface ReducerFunction<TState = unknown> {
  (state: TState, action: ActionThatMayHaveAPayload): TState;
}

function createFrom<T extends new () => InstanceType<T>>(
  Token: T
): ReducerFunction {
  const instance: { initialState?: unknown } = new Token();

  const initialState = instance.initialState;
  const actionReducerMap = methodsFrom(Token)
    .map(name => instance[name].wiredAction)
    .reduce(
      (map, wiredAction) => ({
        ...map,
        [wiredAction.type]: wiredAction.caseReducer
      }),
      {}
    );

  throwIf(
    nullOrUndefined(initialState),
    new NoInitialValueError(createFrom.name, Token.name)
  );

  return function(state = initialState, action: ActionThatMayHaveAPayload) {
    return actionReducerMap[action.type](state, action.payload);
  };
}
