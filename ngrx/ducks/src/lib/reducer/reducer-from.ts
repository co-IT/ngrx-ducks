import { methodsFrom } from '../class';
import { NoInitialValueError, throwIf } from '../errors';
import {
  ActionThatMayHaveAPayload,
  InitialStateAnnotated,
  ReducerFunction
} from '../typings';
import { nullOrUndefined } from '../validators';
import { createActionReducerMap } from './create-action-reducer-map';

/**
 * Create reducer function from given class.
 * @param Token Annotated class providing Duck metadata
 */
export function reducerFrom<T extends new () => InstanceType<T>>(
  Token: T
): ReducerFunction {
  const instance: InitialStateAnnotated = new Token();

  throwIf(
    nullOrUndefined(instance.initialState),
    new NoInitialValueError(reducerFrom.name, Token.name)
  );

  const methodNames = methodsFrom(Token);
  const actionReducerMap = createActionReducerMap<T>(methodNames, instance);

  return function(
    state = instance.initialState,
    action: ActionThatMayHaveAPayload
  ) {
    console.log(state, action);
    return actionReducerMap[action.type]
      ? actionReducerMap[action.type](state, action.payload)
      : state;
  };
}
