import { WiredActions } from '../types';

export function createReducerFrom<T>(wiredActions: WiredActions<T>) {
  console.log('before build red', wiredActions);

  const reducerFns: { [key: string]: Function } = Object.values(wiredActions)
    .filter((action: any) => typeof action.caseReducer === 'function')
    .reduce((fns: { [key: string]: Function }, wiredAction: any) => {
      return {
        ...fns,
        [wiredAction.type]: wiredAction.caseReducer
      };
    }, {});

  return (slice: any, action: any) => {
    console.log(reducerFns, slice, action);
    return !!reducerFns[action.type]
      ? reducerFns[action.type](slice, action.payload)
      : slice;
  };
}
