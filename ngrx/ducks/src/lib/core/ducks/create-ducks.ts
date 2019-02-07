import { Store } from '@ngrx/store';
import { pickFactory } from '../../ducks/pick-factory';
import { DuckCandidates, Ducks, WiredActions } from '../types';
import { createDuck } from './create-duck';
import { createEffectDispatcher } from './create-effect-dispatcher';

/**
 * @deprecated
 * This function will be removed in the next major release.
 * Please use [ducksify]{@link ../../ducks/ducksify.ts} instead
 */
export function createDucks<T, TA extends WiredActions<T>>(
  wiredActions: TA,
  store: Store<any>
): Ducks<T> {
  const ducks = Object.entries(wiredActions).reduce(
    (dispatchers, [_key, duck]) => {
      if (_isDuckForReducer(duck)) {
        return createSingleDuck(dispatchers, [_key, duck], store);
      } else if (_isEffectDispatcher(duck)) {
        return createSingleEffectDispatcher(dispatchers, [_key, duck], store);
      }
      return dispatchers;
    },
    {}
  );

  return Object.assign(
    { ...(wiredActions as Object) },
    ducks,
    pickFactory(store)
  ) as Ducks<T>;
}

function _isEffectDispatcher(duck: {}) {
  return typeof duck === 'object';
}

function _isDuckForReducer(duck: {}) {
  return typeof (duck as any).caseReducer === 'function';
}

function createSingleEffectDispatcher(
  candidates: DuckCandidates<unknown>,
  [key, actionCreatorForEffect]: [string, {}],
  store: Store<unknown>
) {
  return {
    ...candidates,
    [key]: createEffectDispatcher(actionCreatorForEffect as any, store)
  };
}

function createSingleDuck(
  candidates: DuckCandidates<unknown>,
  [key, duck]: [string, {}],
  store: Store<unknown>
) {
  return {
    ...candidates,
    [key]: createDuck(duck, store)
  };
}
