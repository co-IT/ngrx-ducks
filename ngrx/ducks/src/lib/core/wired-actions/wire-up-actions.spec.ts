import { wireUpActions } from './wire-up-actions';

export class Counter {
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
      const wiredActions = wireUpActions(Counter, counter => ({
        Action: counter.set
      }));

      const action = (wiredActions[0] as any)('Hi');

      expect(action).toEqual({ payload: 'Hi', type: 'Action' });
    });
  });
});
