import { Store } from '@ngrx/store';
import { DucksIdentifier } from '../../create-duck/ducks-identifier';
import { ignoreProperties } from './ignore-properties';

export function connectDispatchers(
  instance: any,
  property: string,
  store: Store
): void {
  if (instance[property]['__ngrx_ducks__id'] === DucksIdentifier.Duck) {
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
