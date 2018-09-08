import { createSelfDispatchingActions } from './create-self-dispatching-actions';
import { wireUpActions } from '../wired-actions/wire-up-actions';
import { Ducks } from '../types';

interface State {
  count: number;
}

interface RootState {
  counter: State;
}

class Counter {
  forEffect = '[Counter] Load Counter from API';

  set(state: State, payload: number): State {
    return {
      ...state,
      count: payload
    };
  }
}

describe('create-ducks', () => {
  describe('When a type provides action types to trigger asynchronous operations', () => {
    it('should make the type available through an additional property', () => {
      const counter = new Counter();
      const wiredActions = wireUpActions(Counter, {
        set: '[Counter] Set'
      });
      const store = { dispatch: () => {} };
      const ducks: Ducks<Counter> = createSelfDispatchingActions(wiredActions, store);

      expect(ducks.forEffect.type).toBe(counter.forEffect)
    });
  });
});
