import { ActionCreatorForEffect } from '../types';
import { Store } from '@ngrx/store';

export function createEffectDispatcher<T>(
  actionCreator: ActionCreatorForEffect<T>,
  store: Store<unknown>
) {
  return {
    type: actionCreator.type,
    dispatch: (payload: any) => {
      if (payload) {
        store.dispatch((actionCreator.action as any)(payload));
      } else {
        store.dispatch((actionCreator.action as any)());
      }
    }
  };
}
