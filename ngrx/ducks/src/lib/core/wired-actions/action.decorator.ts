export function Action(actionType: string) {
  return function(
    _target: any,
    _name: string | symbol,
    descriptor: PropertyDescriptor
  ): any {
    const caseReducer = descriptor.value;

    Object.defineProperty(descriptor.value, 'wiredAction', {
      value: { type: actionType, caseReducer },
      writable: false
    });

    return descriptor;
  };
}
