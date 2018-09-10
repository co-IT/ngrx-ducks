import { ActionDispatcher } from '../types/__internal__';

export function createEffectDispatcher(type: string, store: ActionDispatcher) {
  return {
    type,
    dispatch: () => store.dispatch({ type })
  };
}
