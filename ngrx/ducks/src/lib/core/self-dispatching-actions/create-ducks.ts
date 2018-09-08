import { Ducks, WiredActions } from '../types';
import { ActionDispatcher } from '../types/__internal__';
import { createSelfDispatchingAction } from './create-self-dispatching-action';

export function createDucks<T, TA extends WiredActions<T>>(
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

  const asyncDucks = Object.entries(wiredActions)
    .filter(([_key, type]) => typeof type === 'string')
    .reduce((effectDispatchers, [key, type]) => {
      return {
        ...effectDispatchers,
        [key]: createEffectDispatcher(type as string, store)
      };
    }, {});

  return Object.assign({ ...(wiredActions as Object) }, ducks, asyncDucks);
}

function createEffectDispatcher(type: string, store: ActionDispatcher) {
  return {
    type,
    dispatch: () => store.dispatch({ type })
  };
}
