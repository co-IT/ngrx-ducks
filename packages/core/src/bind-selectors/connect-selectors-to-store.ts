import { select, Store } from '@ngrx/store';
import { MemoizedSelectorDictionary } from './types/memoized-selector-dictionary';
import { Selectors } from './types/selectors';

export function connectSelectorsToStore<T extends MemoizedSelectorDictionary>(
  selectors: Selectors<T>,
  store: Store<unknown>
): void {
  const selectorsOriginal: MemoizedSelectorDictionary = selectors.__ngrx_ducks__selectors_original as any;
  Object.keys(selectorsOriginal).forEach(selector => {
    (selectors as any)[selector] = store.pipe(
      select(selectorsOriginal[selector])
    );
  });
}
