import { Ducks, WiredActions } from '../types';
import { ActionDispatcher } from '../types/__internal__/';
import { createSelfDispatchingAction } from './create-self-dispatching-action';

export function createSelfDispatchingActions<T, TA extends WiredActions<T>>(
  wiredActions: TA,
  store: ActionDispatcher
): Ducks<T> {
  const ducks = Object.entries(wiredActions)
    .filter(([_key, duck]) => typeof (duck as any).caseReducer === 'function')
    .reduce((dispatchers: Ducks<T>, [key, duck]) => {
      return {
        ...(dispatchers as any),
        [key]: createSelfDispatchingAction(duck, store)
      };
    }, {});

  return Object.assign({ ...(wiredActions as Object) }, ducks);
}
