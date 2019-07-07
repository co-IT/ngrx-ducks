import { Store } from '@ngrx/store';
import { createSelectorGroup } from './monkey-patches';
import {
  ObservableSelectorFactory,
  MemoizedSelectorDictionary
} from '../typings';

export function bindSelectorGroup<T extends MemoizedSelectorDictionary>(
  selectors: T
): ObservableSelectorFactory<T> {
  const patchSelectors: ObservableSelectorFactory<T> = (
    store: Store<unknown>
  ) => createSelectorGroup(selectors, store);
  patchSelectors.__ngrxDucks__isSelectorGroup = true;
  return patchSelectors;
}
