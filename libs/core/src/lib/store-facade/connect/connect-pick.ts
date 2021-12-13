import { Store } from '@ngrx/store';
import { DucksIdentifier } from '../../create-duck/ducks-identifier';
import { connectPickToStore } from '../../use-pick';
export function connectPick(
  instance: any,
  property: string,
  store: Store<unknown>
): void {
  if (
    instance[property].__ngrx_ducks__id !== DucksIdentifier.DuckPickFunction
  ) {
    return;
  }
  instance[property] = connectPickToStore(instance[property], store);
}
