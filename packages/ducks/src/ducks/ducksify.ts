import { Store } from '@ngrx/store';
import { methodsFrom } from '../class';
import { ClassWithActionAnnotations, Duck } from '../typings';
import { pickFactory } from './pick-factory';
import {
  extractEffectDispatchers,
  extractReducerDispatchers,
  extractMemoizedSelectors
} from './monkey-patches';

/**
 * Transforms methods of a class to self dispatching functions providing
 * a typed API.
 *
 * @param Token Class Token having @Action annotations and effect() properties
 * @param store Redux store instance providing dispatch method
 */
export function ducksify<T extends new () => InstanceType<T>>(
  Token: T,
  store: Store<unknown>
): Duck<InstanceType<T>> {
  const instance: ClassWithActionAnnotations<T> = new Token();
  const methodNames = methodsFrom(Token);

  const reducerDispatchers = extractReducerDispatchers<T>(
    methodNames,
    instance,
    store
  );

  const effectDispatchers = extractEffectDispatchers<T>(instance, store);

  const memoizedSelectors = extractMemoizedSelectors(instance, store);

  return {
    ...instance,
    ...reducerDispatchers,
    ...effectDispatchers,
    ...memoizedSelectors,
    ...pickFactory(store)
  };
}
