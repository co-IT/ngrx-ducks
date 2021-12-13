import { Store } from '@ngrx/store';
import { ignoreProperties } from './ignore-properties';
import { isDuck } from './is-duck';

export function connectDispatchers(
  instance: any,
  property: string,
  store: Store
): void {
  if (isDuck(instance, property)) {
    const { type } = instance[property];

    instance[property].dispatch = (payload?: any) =>
      store.dispatch({ type, payload });
  } else {
    tryResolveDuckRecursively(instance, property, store);
  }
}

function tryResolveDuckRecursively(
  instance: any,
  property: string,
  store: Store
): void {
  const duckCandidates = ignoreProperties(instance[property], [
    'dispatch',
    'type',
    'reducer'
  ]);

  if (duckCandidates.length === 0) {
    return;
  }

  duckCandidates.forEach(duckCandidate =>
    connectDispatchers(instance[property], duckCandidate, store)
  );
}
