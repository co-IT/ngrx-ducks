import { Store } from '@ngrx/store';
import { DucksIdentifier } from '../create-duck/ducks-identifier';
import { pickFactory } from './pick-factory';
import { PickFunction } from './pick-selector';

export function connectPickToStore(
  pick: {
    __ngrx_ducks__id?: DucksIdentifier.DuckPickFunction;
  },
  store: Store<unknown>
): PickFunction {
  if (pick.__ngrx_ducks__id !== DucksIdentifier.DuckPickFunction) {
    throw new Error(
      'ngrx-ducks > usePick > Given candidate is not a pick function.'
    );
  }
  return pickFactory(store).pick;
}
