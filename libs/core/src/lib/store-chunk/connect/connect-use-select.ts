import { Store } from '@ngrx/store';
import { DucksIdentifier } from '../../create-duck';
import { connectUseSelectToStore } from '../../use-select';

export function connectUseSelect(
  instance: any,
  property: string,
  store: Store<unknown>
): void {
  if (
    instance[property].__ngrx_ducks__id !== DucksIdentifier.DuckPickFunction
  ) {
    return;
  }
  instance[property] = connectUseSelectToStore(instance[property], store);
}
