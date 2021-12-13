import { Store } from '@ngrx/store';
import { connectSelectorsToStore } from '../../bind-selectors';

export function connectSelectors(
  instance: any,
  property: string,
  store: Store
): void {
  if (!instance[property].__ngrx_ducks__selectors_original) {
    return;
  }
  connectSelectorsToStore(instance[property], store);
}
