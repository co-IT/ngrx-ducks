import { ActionDispatcher } from '../types/__internal__/';
import { SelfDispatchingActions } from '../types/self-dispatching-action/self-dispatching-actions';
import { createSelfDispatchingAction } from './create-self-dispatching-action';
import { WiredActions } from '../types';

export function createSelfDispatchingActions<T, TA extends WiredActions<T>>(
  wiredActions: TA,
  store: ActionDispatcher
): SelfDispatchingActions<T> {
  const ducks = Object.entries(wiredActions)
    .filter(([_key, duck]) => typeof (duck as any).caseReducer === 'function')
    .reduce((dispatchers: SelfDispatchingActions<T>, [key, duck]) => {
      return {
        ...(dispatchers as any),
        [key]: createSelfDispatchingAction(duck, store)
      };
    }, {});

    return Object.assign(wiredActions, ducks);
}
