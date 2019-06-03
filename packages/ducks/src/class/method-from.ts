/**
 * Yields all methods from a certain class token.
 *
 * The property __initialState_ needs to be excluded since it is only used
 * to setup the initial state for the reducer function.
 * We do not want to patch __initialState__ to become a self-dispatching-action.
 *
 * @param classToken Token containing a prototype chain
 */
export function methodsFrom<T extends new () => InstanceType<T>>(
  classToken: T
) {
  return Object.getOwnPropertyNames(classToken.prototype).filter(
    member => member !== 'constructor' && member !== '__initialState__'
  );
}
