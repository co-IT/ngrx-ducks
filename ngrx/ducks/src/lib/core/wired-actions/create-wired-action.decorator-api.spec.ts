import { WiredActions } from '../types';
import {
  actionType as validActionType,
  WithValidActionType
} from './mocks/duck-candidates';

export function meltDown<T extends new () => InstanceType<T>>(
  classToken: T
): WiredActions<InstanceType<T>> {
  const origin = new classToken();
  const target = { ...origin };

  methodsFrom<T>(classToken).forEach(
    method => (target[method] = wireUpAction(origin, method))
  );

  return target;
}

describe('@Action', () => {
  describe('When a single action type is provided', () => {
    it('should create a single wired action', () => {
      const wired = meltDown(WithValidActionType);
      expect(wired.increase(1)).toEqual({
        type: validActionType,
        payload: 1
      });
    });
  });
});

function methodsFrom<T extends new () => InstanceType<T>>(classToken: T) {
  return Object.getOwnPropertyNames(classToken.prototype).filter(
    omitConstructor
  );
}

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
