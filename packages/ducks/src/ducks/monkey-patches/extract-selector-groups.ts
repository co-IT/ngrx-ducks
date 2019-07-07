import { Store, MemoizedSelector, select } from '@ngrx/store';
import { ObservableSelectors } from '../../typings';
import { isSelector, isSelectorGroup } from './helpers';

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
    .filter(selectorKey => isSelector(selectors[selectorKey]))
    .reduce(
      (group, selectorKey) => ({
        ...group,
        [selectorKey]: store.pipe(select(selectors[selectorKey]))
      }),
      {}
    ) as any;
}
