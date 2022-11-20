import {
  createMutableDuck,
  dispatch,
  StoreChunk,
  useActions,
  useSelect,
  useSelectors
} from '@ngrx-ducks/core';
import { counterFeatureName, State } from '../counter.feature';
import * as selectors from './counter-mutable.selectors';
import { CounterState } from './counter.state';

const initialState = {
  count: 0,
  isLoading: true
};

@StoreChunk<State>({
  feature: counterFeatureName,
  slice: 'counterMutable',
  defaults: initialState
})
export class CounterStore {
  static

    pick = useSelect();
  select = useSelectors(selectors);

  /**
   *
   * You can also create aliases or build selector groups
   *
   * progress = bindSelectors({ isLoading: selectors.isLoading });
   * counter = bindSelectors({ count: selectors.currentCount });
   *
   */

  readonly loadCount = createMutableDuck('Load Count', dispatch<number>());

  increment = createMutableDuck(
    'Increment value',
    (state: CounterState, payload: number) => (state.count += payload)
  );

  decrement = createMutableDuck(
    'Decrement value',
    (state: CounterState, payload: number) => (state.count -= payload)
  );

  override = createMutableDuck(
    'Set value',
    (state: CounterState, payload: number) => {
      state.count = payload;
      state.isLoading = false;
    }
  );

  math = {
    square: createMutableDuck('Square', () => {
      console.log('Nested Ducks work, too.');
    })
  };
}


export const counterStoreChunkActions = useActions(CounterStore, { prefix: counterFeatureName });
