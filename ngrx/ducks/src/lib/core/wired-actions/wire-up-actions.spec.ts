import { wireUpActions } from './wire-up-actions';

export class Counter {
  triggerEffect = 'Async Action';

  set(_state: string, payload: string): string {
    return payload;
  }
}

describe('WireUpActions', () => {
  describe('When constructable is given', () => {
    it('should raise an error', () => {
      expect(() => wireUpActions(undefined, undefined)).toThrow(
        'ngrx-ducks: Cannot create an instance of "undefined".'
      );
    });
  });

  describe('When no methods are given', () => {
    it('should raise an error', () => {
      expect(() => wireUpActions(Counter, undefined)).toThrow(
        'ngrx-ducks: Please configure at least one action having ' +
          'one case reducer.'
      );
    });
  });

  describe('When methods aka case reducers of a class are wired up', () => {
    it('should create an instance of that class first', () => {
      const wiredActions = wireUpActions(Counter, { set: 'Action' });

      const action = wiredActions.set('Hi');

      expect(action).toEqual({ payload: 'Hi', type: 'Action' });
    });
  });

  describe('When a type provides action names to trigger asynchronous operations', () => {
    it('should preserve these properties', () => {
      const counter = new Counter();
      const wiredActions = wireUpActions(Counter, { set: 'Action', });

      expect(counter.triggerEffect).toBe(wiredActions.triggerEffect);
    });
  });
});
