import { MissingActionTypeError, throwIf } from '../errors';

/**
 * Annotates the target function with an action type.
 * This allows to generate a self dispatching action and the reducer function
 * later on.
 * @param type The type of the action that is going to be dispatched
 * @todo Remove any | There must be a better solution
 */
export function Action(type: string) {
  return function(
    target: any,
    _name: string | symbol,
    descriptor: PropertyDescriptor
  ): any {
    throwIf(
      !type || Array.isArray(type),
      new MissingActionTypeError(target.name)
    );
    return singleActionMetadata(type, descriptor);
  };
}

/**
 * Enhances the method of the class with a property "wiredAction".
 * It contains the type of the action as well as the case reducer function.
 *
 * @param type The unique type of an action
 * @param descriptor The class method containing the case reducer function
 */
function singleActionMetadata(type: string, descriptor: PropertyDescriptor) {
  const caseReducer = descriptor.value;

  Object.defineProperty(descriptor.value, 'wiredAction', {
    value: { type: type, caseReducer },
    writable: false
  });

  return descriptor;
}
