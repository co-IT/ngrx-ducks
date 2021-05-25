import {
  bindSelectors,
  createMutableDuck,
  dispatch,
  getActions,
  getMutableReducer,
  StoreFacade,
  usePick
} from '@ngrx-ducks/core';
import * as selectors from './counter.selectors';
import { CounterState } from './counter.state';

const initialState = {
  count: 0,
  isLoading: true
};

@StoreFacade()
export class CounterMutableFacade {
  static actions = getActions(CounterMutableFacade);
  static reducer = getMutableReducer(initialState, CounterMutableFacade);

  pick = usePick();
  select = bindSelectors(selectors);

  /**
   *
   * You can also create aliases or build selector groups
   *
   * progress = bindSelectors({ isLoading: selectors.isLoading });
   * counter = bindSelectors({ count: selectors.currentCount });
   *
   */

  readonly loadCount = createMutableDuck(
    '[Counter] Load Count',
    dispatch<number>()
  );

  increment = createMutableDuck(
    '[Counter] Increment value',
    (state: CounterState, payload: number) => (state.count += payload)
  );

  decrement = createMutableDuck(
    '[Counter] Decrement value',
    (state: CounterState, payload: number) => (state.count -= payload)
  );

  override = createMutableDuck(
    '[Counter] Set value',
    (state: CounterState, payload: number) => {
      state.count = payload;
      state.isLoading = false;
    }
  );

  math = {
    square: createMutableDuck('[Counter] Square', () => {
      console.log('adasdsa');
    })
  };
}
