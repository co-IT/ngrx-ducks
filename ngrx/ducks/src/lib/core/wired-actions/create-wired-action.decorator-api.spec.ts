import { WiredActions } from '../types';

export function Action(actionType: string) {
  return function(
    target: any,
    name: string | symbol,
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

export function meltDown<T extends new () => InstanceType<T>>(
  classToken: T
): WiredActions<InstanceType<T>> {
  const origin = new classToken();
  const target = new classToken();

  const methods = Object.getOwnPropertyNames(classToken.prototype).filter(
    omitConstructor
  );

  methods.forEach(method => (target[method] = wireUpAction(origin, method)));

  return target;
}

const actionType = '[Counter] Set Number';

class Counter {
  @Action(actionType)
  increase(state: number, payload: number) {
    return state + payload;
  }
}

describe('@Action', () => {
  describe('Annotating a method with @Action', () => {
    it('should create a wired action', () => {
      const wired = meltDown(Counter);
      expect(wired.increase(1)).toEqual({
        type: actionType,
        payload: 1
      });
    });
  });
});

function wireUpAction<T>(instance: T, method: string) {
  const wiredAction: any = (payload: any) => ({
    type: instance[method].wiredAction.type,
    payload
  });
  wiredAction.type = instance[method].wiredAction.type;
  wiredAction.caseReducer = instance[method].wiredAction.caseReducer;
  return wiredAction;
}

function omitConstructor(member: string): boolean {
  return member !== 'constructor';
}
