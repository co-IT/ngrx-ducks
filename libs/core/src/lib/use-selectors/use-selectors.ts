import { MemoizedSelector } from '@ngrx/store';
import { throwError } from 'rxjs';
import { NgRxDucksNotConnectedError } from '../create-duck/ngrx-ducks-not-connected.error';
import { selectorIdentifierPropertyKey } from './selector-identifier-property-key';
import { MemoizedSelectorFactory } from './types/memoized-selector-factory';
import { Selectors } from './types/selectors';

export function useSelectors<
  T extends {
    [key: string]:
      | MemoizedSelector<any, any>
      | MemoizedSelectorFactory<any, any>;
  }
>(selectors: T): Selectors<T> {
  const selectorFunctions = Object.keys(selectors).reduce(
    (functions, selector) => ({
      ...functions,
      [selector]: throwError(() => new NgRxDucksNotConnectedError())
    }),
    {}
  );

  return {
    ...selectorFunctions,
    [selectorIdentifierPropertyKey]: selectors
  } as any;
}
