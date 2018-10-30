import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReplaySubject } from 'rxjs';
import { createDucks, Ducks, wireUpActions } from '../../../public_api';

class StoreMock<T> extends ReplaySubject<T> {
  constructor(initialState: T) {
    super();
    this.next(initialState);
  }

  dispatch() {}
}

class CounterState {
  count = 10;
}

class State {
  counter = new CounterState();
}

class Some {}

describe('Select data from a store', () => {
  it("should pass through the store's select method", done => {
    const state = new State();
    const featureSelector = createFeatureSelector<CounterState>('counter');
    const selectCount = createSelector(featureSelector, s => s.count);
    const store = new StoreMock(state);
    const wiredActions = wireUpActions(Some, {});
    const ducks: Ducks<Some> = createDucks(wiredActions, store);

    ducks.pick(selectCount).subscribe(count => {
      expect(count).toBe(10);
      done();
    });
  });
});

