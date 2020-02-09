import { TestBed } from '@angular/core/testing';
import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { bindSelectors } from '../bind-selectors';
import { createDuck, dispatch } from '../create-duck/create-duck';
import { usePick } from '../use-pick';
import { StoreFacade } from './store-facade';

describe('@StoreFacade', () => {
  describe('When a class with ducks is annotated', () => {
    const feature = createFeatureSelector<{ count: number }>('counter');
    const selectorCount = createSelector(
      feature,
      counter => counter.count
    );

    let store: Store<unknown>;
    let counter: Counter;

    @StoreFacade()
    class Counter {
      pick = usePick();
      select = bindSelectors({ selectorCount });

      increment = createDuck('Increment');
      add = createDuck('Add', dispatch<number>());
    }

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          provideMockStore({ initialState: { counter: { count: 10 } } })
        ]
      });

      counter = TestBed.get(Counter);
      store = TestBed.get(Store);
    });

    it('allows dispatching an action', () => {
      const spyDispatch = jest.spyOn(store, 'dispatch');
      counter.increment.dispatch();
      expect(spyDispatch).toHaveBeenCalled();
    });

    it('allows dispatching an action with payload', () => {
      const spyDispatch = jest.spyOn(store, 'dispatch');
      counter.add.dispatch(23);

      expect(spyDispatch).toHaveBeenCalledWith({
        type: counter.add.type,
        payload: 23
      });
    });

    it('selects data from the store', done => {
      counter.select.selectorCount.subscribe(count => {
        expect(count).toBe(10);
        done();
      });
    });

    it('selects data with pick from the store', done => {
      counter.pick(selectorCount).subscribe(count => {
        expect(count).toBe(10);
        done();
      });
    });
  });
});
