import { Store } from '@ngrx/store';
import { connectSelectorsToStore } from '../../use-selectors';
import { selectorIdentifierPropertyKey } from '../../use-selectors/selector-identifier-property-key';

export function connectSelectors(
  instance: any,
  property: string,
  store: Store
): void {
  if (!instance[property][selectorIdentifierPropertyKey]) {
    return;
  }
  connectSelectorsToStore(instance[property], store);
}
