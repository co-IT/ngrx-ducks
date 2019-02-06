import { TestBed } from '@angular/core/testing';
import { ActionReducerMap, Store, StoreModule } from '@ngrx/store';
import { Action, InitialState } from '../decorators';
import { reducerFrom } from '../reducer/reducer-from';
import { DuckService } from '../typings/duck-service';
import { createDuckService } from './create-duck-service';

@InitialState(0)
export class Counter {
  @Action('increment')
  increment(state: number) {
    return ++state;
  }
}

describe('@NgModule', () => {
  let store: Store<unknown>;
  let counter: DuckService<Counter>;
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
            return createDuckService(Counter, store);
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
  });
});
