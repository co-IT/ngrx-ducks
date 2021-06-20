import { ɵɵdefineInjectable, ɵɵinject } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReducer } from '../get-reducer';
import { AnnotationTarget } from './annotation-target';
import { connect } from './connect';
import { ReducerRegistrator } from './reducer-registrator.service';

interface StoreFacadeConfiguration<TState = any> {
  registerInStore:
    | [string, keyof TState, TState[keyof TState]]
    | [string, TState[keyof TState]];
}

export function StoreFacade<TState = any>(
  config?: StoreFacadeConfiguration<TState>
) {
  return function(constructor: AnnotationTarget) {
    constructor.ɵfac = notConstructableError;
    constructor.ɵprov = ɵɵdefineInjectable({
      token: constructor,
      providedIn: 'root',
      factory() {
        if (config) {
          registerReducerInStore(config, constructor);
        }

        return connect(constructor, ɵɵinject(Store) as Store);
      }
    });

    return constructor as any;
  };
}

export function notConstructableError() {
  throw new Error('ɵfac: Cannot create class directly.');
}

function registerReducerInStore(
  configuration: StoreFacadeConfiguration,
  constructor: AnnotationTarget
) {
  const reducerRegistrator: ReducerRegistrator = ɵɵinject(ReducerRegistrator);

  // without ActionReducerMap
  if (configuration.registerInStore.length === 2) {
    const [featureKey, initialState] = configuration.registerInStore;
    // TODO: check if duck is mutable or immutable to call the right reducerFactory
    const reducer = getReducer(initialState, constructor);

    reducerRegistrator.register(featureKey, reducer);
  }

  // with ActionReducerMap
  if (configuration.registerInStore.length === 3) {
    const [
      featureKey,
      reducerKey,
      initialState
    ] = configuration.registerInStore;
    // TODO: check if duck is mutable or immutable to call the right reducerFactory
    const reducer = getReducer(initialState, constructor);

    reducerRegistrator.register(featureKey, { [reducerKey]: reducer });
  }
}
