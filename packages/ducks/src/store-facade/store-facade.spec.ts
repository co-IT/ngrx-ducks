import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { createDuck, dispatch } from '../create-duck/create-duck';
import { StoreFacade } from './store-facade';

describe('@StoreFacade', () => {
  describe('When a class with ducks is annotated', () => {
    let store: Store<unknown>;
    let counter: Counter;

    @StoreFacade()
    class Counter {
      increment = createDuck('Increment');
      add = createDuck('Add', dispatch<number>());
    }

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [provideMockStore()]
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
  });
});
