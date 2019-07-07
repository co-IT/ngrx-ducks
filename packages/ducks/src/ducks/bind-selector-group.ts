import { Store, MemoizedSelector } from '@ngrx/store';
import { ObservableSelectors } from '../typings';
import { createSelectorGroup } from './monkey-patches';

export function bindSelectorGroup<
  T extends {
    [key: string]: MemoizedSelector<any, any>;
  }
>(selectors: T): (store: Store<unknown>) => ObservableSelectors<T> {
  const patchSelectors = (store: Store<unknown>) =>
    createSelectorGroup(selectors, store);
  (patchSelectors as any).__ngrxDucks__isSelectorGroup = true;
  return patchSelectors;
}
