import { Ducks, WiredActions } from '../types';
import { createDuck } from './create-duck';
import { createEffectDispatcher } from './create-effect-dispatcher';
import { Store } from '@ngrx/store';
import { pickFactory } from './pick-factory';

export function createDucks<T, TA extends WiredActions<T>>(
  wiredActions: TA,
  store: Store<unknown>
): Ducks<T> {
  const ducks = Object.entries(wiredActions)
    .filter(([_key, duck]) => typeof (duck as any).caseReducer === 'function')
    .reduce(
      (dispatchers: Ducks<T>, wiredAction) =>
        createSingleDuck<T>(dispatchers, wiredAction, store),
      {}
    );

  const asyncDucks = Object.entries(wiredActions)
    .filter(([_key, type]) => typeof type === 'object')
    .reduce(createSingleEffectDispatcher(store), {});

  return Object.assign(
    { ...(wiredActions as Object) },
    ducks,
    asyncDucks,
    pickFactory(store as any)
  );
}

function createSingleEffectDispatcher(
  store: Store<unknown>
): (
  previousValue: {},
  currentValue: [string, {}],
  currentIndex: number,
  array: [string, {}][]
) => {} {
  return (effectDispatchers, [key, actionCreatorForEffect]) => ({
    ...effectDispatchers,
    [key]: createEffectDispatcher(actionCreatorForEffect as any, store)
  });
}

function createSingleDuck<T>(
  dispatchers: Ducks<T>,
  [key, duck]: [string, {}],
  store: Store<unknown>
) {
  return {
    ...(dispatchers as any),
    [key]: createDuck(duck, store)
  };
}
