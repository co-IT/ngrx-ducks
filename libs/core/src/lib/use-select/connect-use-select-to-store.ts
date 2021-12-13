import { Store } from '@ngrx/store';
import { DucksIdentifier } from '../create-duck';
import { useSelectorFactory } from './use-selector-factory';
import { SelectFunction } from './use-select-container';

export function connectUseSelectToStore(
  pick: {
    __ngrx_ducks__id?: DucksIdentifier.DuckPickFunction;
  },
  store: Store<unknown>
): SelectFunction {
  if (pick.__ngrx_ducks__id !== DucksIdentifier.DuckPickFunction) {
    throw new Error(
      'ngrx-ducks > usePick > Given candidate is not a pick function.'
    );
  }
  return useSelectorFactory(store).select;
}
