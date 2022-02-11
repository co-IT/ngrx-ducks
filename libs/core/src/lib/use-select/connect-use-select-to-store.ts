import { Store } from '@ngrx/store';
import { duckIdentifierPropertyKey, DucksIdentifier } from '../create-duck';
import { SelectFunction } from './use-select-container';
import { useSelectorFactory } from './use-selector-factory';

export function connectUseSelectToStore(
  pick: {
    [duckIdentifierPropertyKey]?: DucksIdentifier.DuckPickFunction;
  },
  store: Store<unknown>
): SelectFunction {
  if (pick[duckIdentifierPropertyKey] !== DucksIdentifier.DuckPickFunction) {
    throw new Error(
      'ngrx-ducks > usePick > Given candidate is not a pick function.'
    );
  }
  return useSelectorFactory(store).select;
}
