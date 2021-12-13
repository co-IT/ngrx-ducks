import { TestBed } from '@angular/core/testing';
import {
  createFeatureSelector,
  createSelector,
  Store,
  StoreModule
} from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { bindSelectors } from '../bind-selectors';
import { createDuck } from '../create-duck/create-duck';
import { dispatch } from '../create-duck/dispatch';
import { usePick } from '../use-pick';
import { StoreChunk } from './store-facade';

describe(StoreChunk.name, () => {
  describe('When a class with ducks is annotated', () => {
    const feature = createFeatureSelector<{ count: number }>('counter');
    const selectorCount = createSelector(feature, counter => counter.count);

    let store: Store<unknown>;
    let counter: Counter;

    @StoreChunk()
    class Counter {
      static staticsShouldBeAllowed = 'I am static';

      pick = usePick();
      select = bindSelectors({ selectorCount });

      increment = createDuck('Increment');
      add = createDuck('Add', dispatch<number>());
    }

    beforeEach(() => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          provideMockStore({ initialState: { counter: { count: 10 } } })
        ]
      });

      counter = TestBed.inject(Counter);
      store = TestBed.inject(Store);
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

    it('allows using statics', () => {
      expect(Counter.staticsShouldBeAllowed).toBe('I am static');
    });
  });

  describe('When a facade contains nested ducks', () => {
    let store: Store<unknown>;
    let counter: Counter;

    @StoreChunk()
    class Counter {
      math = {
        increment: createDuck('Increment'),
        add: createDuck('Add', dispatch<number>())
      };
    }

    beforeEach(() => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          provideMockStore({ initialState: { counter: { count: 10 } } })
        ]
      });

      counter = TestBed.inject(Counter);
      store = TestBed.inject(Store);
    });

    it('resolves the duck', () => {
      const dispatchSpy = jest.spyOn(store, 'dispatch');
      counter.math.add.dispatch(1);
      expect(dispatchSpy).toHaveBeenCalledWith({ type: 'Add', payload: 1 });
    });
  });

  describe('Reducer registration', () => {
    describe('Reducer Function: When a facade is configured to register the reducer', () => {
      interface CounterState {
        count: number;
      }

      @StoreChunk({ feature: 'counterSlice', defaults: { count: 0 } })
      class Counter {
        pick = usePick();

        increment = createDuck('Increment', (state: CounterState) => ({
          ...state,
          count: state.count + 1
        }));
      }

      let store: Store<unknown>;
      let counter: Counter;

      beforeEach(() => {
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({ imports: [StoreModule.forRoot({})] });

        counter = TestBed.inject(Counter);
        store = TestBed.inject(Store);
      });

      it("registers the facade's reducer in the Store", done => {
        counter.increment.dispatch();

        store
          .select((state: any) => state.counterSlice.count)
          .subscribe(count => {
            expect(count).toBe(1);
            done();
          });
      });
    });
  });

  describe('Reducer Map: When a facade is configured to register the reducer map', () => {
    interface CounterState {
      count: number;
    }

    @StoreChunk<{ counter: CounterState }>({
      feature: 'counterFeature',
      slice: 'counter',
      defaults: { count: 0 }
    })
    class Counter {
      pick = usePick();

      increment = createDuck('Increment', (state: CounterState) => ({
        ...state,
        count: state.count + 1
      }));
    }

    let store: Store<unknown>;
    let counter: Counter;

    beforeEach(() => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({ imports: [StoreModule.forRoot({})] });

      counter = TestBed.inject(Counter);
      store = TestBed.inject(Store);
    });

    it("registers the facade's reducer in the Store", done => {
      counter.increment.dispatch();

      store
        .select((state: any) => state.counterFeature.counter.count)
        .subscribe(count => {
          expect(count).toBe(1);
          done();
        });
    });
  });
});
