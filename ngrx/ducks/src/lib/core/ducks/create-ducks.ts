import { Ducks, WiredActions } from '../types';
import { ActionDispatcher } from '../types/__internal__';
import { createDuck } from './create-duck';
import { createEffectDispatcher } from './create-effect-dispatcher';

export function createDucks<T, TA extends WiredActions<T>>(
  wiredActions: TA,
  store: ActionDispatcher
): Ducks<T> {
  const ducks = Object.entries(wiredActions)
    .filter(([_key, duck]) => typeof (duck as any).caseReducer === 'function')
    .reduce((dispatchers: Ducks<T>, [key, duck]) => {
      return {
        ...(dispatchers as any),
        [key]: createDuck(duck, store)
      };
    }, {});

  const asyncDucks = Object.entries(wiredActions)
    .filter(([_key, type]) => typeof type === 'string')
    .reduce(
      (effectDispatchers, [key, type]) => ({
        ...effectDispatchers,
        [key]: createEffectDispatcher(type as string, store)
      }),
      {}
    );

  return Object.assign({ ...(wiredActions as Object) }, ducks, asyncDucks);
}
