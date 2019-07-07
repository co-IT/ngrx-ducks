import { select, Store } from '@ngrx/store';
import { isSelector } from './helpers';

export function extractMemoizedSelectors(instance: any, store: Store<unknown>) {
  return Object.getOwnPropertyNames(instance)
    .filter(member => isSelector(instance[member]))
    .reduce(
      (selectors, member) => ({
        ...selectors,
        [member]: store.pipe(select(instance[member]))
      }),
      {}
    );
}
