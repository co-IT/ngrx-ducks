import { WiredActions } from '../types';

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
    !!reducerFns[action.type]
      ? reducerFns[action.type](slice, action.payload)
      : slice;
}
