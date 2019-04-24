import { createFeatureSelector, createSelector } from '@ngrx/store';
import { createDucks, Ducks, wireUpActions } from '../../../src/public_api';
import { StoreMock } from '../../mocks';

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
    const selectCount = createSelector(
      featureSelector,
      s => s.count
    );
    const store = new StoreMock(state);
    const wiredActions = wireUpActions(Some, {});
    const ducks: Ducks<Some> = createDucks(wiredActions, store as any);

    ducks.pick(selectCount).subscribe(count => {
      expect(count).toBe(10);
      done();
    });
  });
});
