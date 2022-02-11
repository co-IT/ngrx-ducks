import { select, Store } from '@ngrx/store';
import { selectorIdentifierPropertyKey } from './selector-identifier-property-key';
import { MemoizedSelectorDictionary } from './types/memoized-selector-dictionary';
import { Selectors } from './types/selectors';

export function connectSelectorsToStore<T extends MemoizedSelectorDictionary>(
  selectors: Selectors<T>,
  store: Store<unknown>
): void {
  const selectorsOriginal: MemoizedSelectorDictionary = selectors[
    selectorIdentifierPropertyKey
  ] as any;

  Object.keys(selectorsOriginal).forEach(key => {
    if (isSelector(selectorsOriginal[key])) {
      (selectors as any)[key] = store.pipe(select(selectorsOriginal[key]));
      return;
    }

    if (isSelectorFactory(selectorsOriginal[key])) {
      (selectors as any)[key] = (...args: any) => {
        const selectorWithParameter = (selectorsOriginal[key] as any)(...args);

        return store.pipe(select(selectorWithParameter));
      };
    }
  });
}

/**
 * Checks if internal members of a selector are present.
 * If every member function is found we assume it is a selector.
 *
 * @param candidate maybe a selector
 * @returns indicator if a selector has been passed
 */
function isSelector(candidate: unknown): boolean {
  return (
    Object.prototype.hasOwnProperty.call(candidate, 'projector') &&
    Object.prototype.hasOwnProperty.call(candidate, 'release') &&
    Object.prototype.hasOwnProperty.call(candidate, 'setResult') &&
    Object.prototype.hasOwnProperty.call(candidate, 'clearResult')
  );
}

function isSelectorFactory(candidate: unknown): boolean {
  return typeof candidate === 'function';
}
