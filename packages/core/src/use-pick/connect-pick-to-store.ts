import { Store } from '@ngrx/store';
import { DucksIdentifier } from '../create-duck/create-duck';
import { pickFactory } from '../decorator-api/ducks/pick-factory';
import { PickFunction } from '../decorator-api/typings';

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
