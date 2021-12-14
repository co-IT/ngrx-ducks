import { Store } from '@ngrx/store';
import { ignoreProperties } from './ignore-properties';
import { isDuck } from './is-duck';
import { StoreChunkConfiguration } from '../reducer-registration';
import { inferTypePrefixFromFeatureName } from './infer-type-prefix-from-feature-name';

export function connectDispatchers(
  instance: any,
  property: string,
  store: Store,
  configuration?: StoreChunkConfiguration
): void {
  if (isDuck(instance, property)) {
    const typePrefix = inferTypePrefixFromFeatureName(configuration);
    const type = `${typePrefix}${instance[property].type}`;

    instance[property] = (payload?: any) => ({ type, payload });
    instance[property].type = type;
    instance[property].dispatch = (payload?: any) => {
      store.dispatch({ type, payload });
    };
  } else {
    tryResolveDuckRecursively(instance, property, store, configuration);
  }
}

function tryResolveDuckRecursively(
  instance: any,
  property: string,
  store: Store,
  configuration?: StoreChunkConfiguration
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
    connectDispatchers(instance[property], duckCandidate, store, configuration)
  );
}
