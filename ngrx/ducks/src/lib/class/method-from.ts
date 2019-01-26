/**
 * Yields all methods from a certain class token.
 *
 * @param classToken Token containing a prototype chain
 */
export function methodsFrom<T extends new () => InstanceType<T>>(
  classToken: T
) {
  return Object.getOwnPropertyNames(classToken.prototype).filter(
    member => member !== 'constructor'
  );
}
