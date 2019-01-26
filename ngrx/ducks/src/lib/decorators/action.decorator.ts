/**
 * Annotates the target function with an action type.
 * This allows to generate a self dispatching action and the reducer function
 * later on.
 * @param typeCandidate The type of the action that is going to be dispatched
 */
export function Action(typeCandidate: string | string[]) {
  return function(
    _target: any,
    _name: string | symbol,
    descriptor: PropertyDescriptor
  ): any {
    return Array.isArray(typeCandidate)
      ? multipleActionMetadata(typeCandidate, descriptor)
      : singleActionMetadata(typeCandidate, descriptor);
  };
}

function singleActionMetadata(
  actionType: string,
  descriptor: PropertyDescriptor
) {
  const caseReducer = descriptor.value;

  Object.defineProperty(descriptor.value, 'wiredAction', {
    value: { type: actionType, caseReducer },
    writable: false
  });

  return descriptor;
}

function multipleActionMetadata(
  actionTypes: string[],
  descriptor: PropertyDescriptor
) {
  const caseReducer = descriptor.value;

  Object.defineProperty(descriptor.value, 'wiredAction', {
    value: actionTypes.map(type => ({ type, caseReducer })),
    writable: false
  });

  return descriptor;
}
