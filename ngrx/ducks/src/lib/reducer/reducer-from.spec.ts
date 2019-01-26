import {
  WithInitialState,
  WithInternalMethodCallRedirect
} from '../../../test/mocks';
import { methodsFrom } from '../class';
import { NoInitialValueError, throwIf } from '../errors';
import { nullOrUndefined } from '../validators';

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

export interface ActionThatMayHaveAPayload<TPayload = unknown> {
  type: string;
  payload?: TPayload;
}

export interface ReducerFunction<TState = unknown> {
  (state: TState, action: ActionThatMayHaveAPayload): TState;
}

function reducerFrom<T extends new () => InstanceType<T>>(
  Token: T
): ReducerFunction {
  const instance: { initialState?: unknown } = new Token();
  const initialState = instance.initialState;

  throwIf(
    nullOrUndefined(initialState),
    new NoInitialValueError(reducerFrom.name, Token.name)
  );

  const actionReducerMap = methodsFrom(Token)
    .map(name => instance[name].wiredAction)
    .reduce(
      (map, wiredAction) => ({
        ...map,
        [wiredAction.type]: wiredAction.caseReducer.bind(instance)
      }),
      {}
    );

  return function(state = initialState, action: ActionThatMayHaveAPayload) {
    return actionReducerMap[action.type](state, action.payload);
  };
}
