import { ActionCreatorForEffect } from '../types';
import { ActionDispatcher } from '../types/__internal__';

export function createEffectDispatcher<T>(
  actionCreator: ActionCreatorForEffect<T>,
  store: ActionDispatcher
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
