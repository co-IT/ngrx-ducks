import { methodsFrom } from '../class';
import { NoInitialValueError, throwIf } from '../errors';
import {
  ActionThatMayHaveAPayload,
  InitialStateAnnotated,
  ReducerFunction
} from '../typings';
import { nullOrUndefined } from '../validators';

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
    return actionReducerMap[action.type](state, action.payload);
  };
}
/**
 * Provide key value pair for action type and case reducer
 * It binds the class scope to the case reducer making it possible
 * to use the "this" scope inside each case reducer.
 *
 * @param methodNames method names of the class
 * @param instance of the class
 */
function createActionReducerMap<T extends new () => InstanceType<T>>(
  methodNames: string[],
  instance: InitialStateAnnotated<unknown>
) {
  return methodNames
    .map(name => (instance as any)[name].wiredAction)
    .reduce(
      (actionReducerMap, wiredAction) => ({
        ...actionReducerMap,
        [wiredAction.type]: wiredAction.caseReducer.bind(instance)
      }),
      {}
    );
}
