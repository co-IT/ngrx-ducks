import { TestBed } from '@angular/core/testing';
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  Store,
  StoreModule
} from '@ngrx/store';
import { Action, InitialState } from '../decorators';
import { reducerFrom } from '../reducer/reducer-from';
import { Duck } from '../typings';
import { ducksify } from './ducksify';

const feature = createFeatureSelector<number>('counter');
const currentCount = createSelector(
  feature,
  count => count
);

@InitialState(0)
export class Counter {
  current$ = currentCount;

  @Action('increment')
  increment(state: number) {
    return ++state;
  }
}

describe('@NgModule', () => {
  let store: Store<unknown>;
  let counter: Duck<Counter>;
  let dispatch: jest.SpyInstance;
  let reducers: ActionReducerMap<unknown>;

  beforeEach(() => {
    reducers = { counter: reducerFrom(Counter) };
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers)],
      providers: [
        {
          provide: Counter,
          useFactory(store: Store<unknown>) {
            return ducksify(Counter, store);
          },
          deps: [Store]
        }
      ]
    });

    store = TestBed.get(Store);
    counter = TestBed.get(Counter);

    dispatch = jest.spyOn(store, 'dispatch');
  });

  describe('When the duck service is provided', () => {
    it('should provide self dispatching actions', () => {
      counter.increment();
      expect(dispatch).toHaveBeenCalledWith({ type: 'increment' });
    });

    it('should update the state', done => {
      counter.increment();

      store.subscribe((state: any) => {
        expect(state.counter).toBe(1);
        done();
      });
    });
  });

  describe('When a selector is passed', () => {
    it('should yield the result of the selector', done => {
      counter.pick(currentCount).subscribe(count => {
        expect(count).toBe(0);
        done();
      });
    });
  });

  describe('When a selector is a member of the duck', () => {
    it('should yield the selected value', done => {
      counter.current$.subscribe(count => {
        expect(count).toBe(0);
        done();
      });
    });
  });
});
