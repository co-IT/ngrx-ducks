import { InitialStateAnnotated } from '../typings';
/**
 * Provide key value pair for action type and case reducer
 * It binds the class scope to the case reducer making it possible
 * to use the "this" scope inside each case reducer.
 *
 * @param methodNames method names of the class
 * @param instance of the class
 */
export function createActionReducerMap<T extends new () => InstanceType<T>>(
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
