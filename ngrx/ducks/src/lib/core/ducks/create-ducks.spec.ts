import { Store } from '@ngrx/store';
import { Ducks } from '../types';
import { wireUpActions } from '../wired-actions/wire-up-actions';
import { createDucks } from './create-ducks';
import { effect } from './effect';

interface State {
  count: number;
}

class Counter {
  forEffect = effect('[Counter] Load Counter from API');

  set(state: State, payload: number): State {
    return {
      ...state,
      count: payload
    };
  }
}

describe('create-ducks', () => {
  describe('When a type provides action types to trigger asynchronous operations', () => {
    let counter: Counter;
    let dispatchMock: jest.Mock;
    let store: Store<unknown>;
    let ducks: Ducks<Counter>;

    beforeEach(() => {
      counter = new Counter();

      dispatchMock = jest.fn();
      store = { dispatch: dispatchMock } as any;

      const wiredActions = wireUpActions(Counter, {
        set: '[Counter] Set'
      });

      ducks = createDucks(wiredActions, store);
    });

    it('should make the type available through an additional property', () => {
      expect(ducks.forEffect.type).toBe(counter.forEffect.type);
    });

    it('should dispatch that action type', () => {
      ducks.forEffect.dispatch();

      expect(store.dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
