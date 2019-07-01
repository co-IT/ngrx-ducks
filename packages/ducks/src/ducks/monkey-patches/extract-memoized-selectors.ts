import { select, Store } from '@ngrx/store';

export function extractMemoizedSelectors(instance: any, store: Store<unknown>) {
  return Object.getOwnPropertyNames(instance)
    .filter(member => isMemoizedSelector(instance, member))
    .reduce(
      (selectors, member) => ({
        ...selectors,
        [member]: store.pipe(select(instance[member]))
      }),
      {}
    );
}

export function isMemoizedSelector(instance: any, member: string): any {
  return instance[member].release && instance[member].projector;
}
