import { MemoizedSelector } from '@ngrx/store';
import { throwError } from 'rxjs';
import { NgRxDucksNotConnectedError } from '../create-duck/create-duck-not-connected.error';
import { MemoizedSelectorFactory } from './types/memoized-selector-factory';
import { Selectors } from './types/selectors';

export function bindSelectors<
  T extends {
    [key: string]:
      | MemoizedSelector<any, any>
      | MemoizedSelectorFactory<any, any>;
  }
>(selectors: T): Selectors<T> {
  const selectorsFailing = Object.keys(selectors).reduce(
    (fakes, selector) => ({
      ...fakes,
      [selector]: throwError(new NgRxDucksNotConnectedError())
    }),
    {}
  );

  return {
    ...selectorsFailing,
    __ngrx_ducks__selectors_original: selectors
  } as any;
}
