import { Store, MemoizedSelector, select } from '@ngrx/store';
import { ObservableSelectors } from '../../typings';

export function extractSelectorGroups(instance: any, store: Store<unknown>) {
  return Object.getOwnPropertyNames(instance)
    .filter(member => isSelectorGroup(instance, member))
    .reduce((selectorGroups, member: any) => {
      return {
        ...selectorGroups,
        [member]: instance[member](store)
      };
    }, {});
}

export function createSelectorGroup<
  T extends { [key: string]: MemoizedSelector<any, any> }
>(selectors: T, store: Store<unknown>): ObservableSelectors<T> {
  return Object.keys(selectors)
    .filter(selectorKey => isMemoizedSelector(selectors[selectorKey]))
    .reduce(
      (group, selectorKey) => ({
        ...group,
        [selectorKey]: store.pipe(select(selectors[selectorKey]))
      }),
      {}
    ) as any;
}

function isSelectorGroup(instance: any, member: string): boolean {
  return (
    !!instance[member].__ngrxDucks__isSelectorGroup &&
    instance[member].__ngrxDucks__isSelectorGroup === true
  );
}

function isMemoizedSelector(candidate: any): boolean {
  return !!candidate.release && !!candidate.projector;
}
