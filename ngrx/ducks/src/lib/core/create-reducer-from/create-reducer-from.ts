import { WiredActions } from '../types';

/**
 * @deprecated
 * This function will be removed in the next major release.
 * Please use [reducerFrom]{@link ../../reducer/reducer-from.ts} instead
 */
export function createReducerFrom<T>(wiredActions: WiredActions<T>) {
  const reducerFns: { [key: string]: Function } = Object.values(wiredActions)
    .filter((action: any) => typeof action.caseReducer === 'function')
    .reduce<{ [key: string]: Function }>(
      (fns, wiredAction: any) => ({
        ...fns,
        [wiredAction.type]: wiredAction.caseReducer
      }),
      {}
    );

  return (slice: any, action: any) =>
    reducerFns[action.type]
      ? reducerFns[action.type](slice, action.payload)
      : slice;
}
