import { ɵɵdefineInjectable, ɵɵinject } from '@angular/core';
import { ActionReducer, Store } from '@ngrx/store';
import { getMutableReducer } from '../get-mutable-reducer/get-mutable-reducer';
import { getReducer } from '../get-reducer';
import { AnnotationTarget } from './annotation-target';
import { connect, isImmutableDuck, isMutableDuck } from './connect';
import { ReducerRegistrator } from './reducer-registrator.service';
import { StoreFacadeConfiguration } from './store-facade.configuration';

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

  if (wantsToRegisterPlainReducer(configuration)) {
    const [featureKey, initialState] = configuration.registerInStore;
    const reducer = retrieveReducer(initialState, constructor);

    reducerRegistrator.register(featureKey, reducer);
  }

  if (wantsToReducerReducerMap(configuration)) {
    const [
      featureKey,
      reducerKey,
      initialState
    ] = configuration.registerInStore;
    const reducer = retrieveReducer(initialState, constructor);

    reducerRegistrator.register(featureKey, { [reducerKey]: reducer });
  }
}

function wantsToRegisterPlainReducer(
  configuration: StoreFacadeConfiguration
): boolean {
  return configuration.registerInStore.length === 2;
}

function wantsToReducerReducerMap(
  configuration: StoreFacadeConfiguration
): boolean {
  return configuration.registerInStore.length === 3;
}

function retrieveReducer(
  initialState: unknown,
  Token: AnnotationTarget
): ActionReducer<any, any> {
  const instance = new Token();

  if (hasImmutableDuck(instance)) {
    return getReducer(initialState, Token);
  }

  if (hasMutableDuck(instance)) {
    return getMutableReducer(initialState, Token);
  }

  throw new Error(
    '[ngrx-ducks] StoreFacade: At least one Duck is required to build a reducer function. ' +
      'Please use either createDuck or createMutableDuck.'
  );
}

function hasImmutableDuck(instance: any): boolean {
  return Object.keys(instance).some(property =>
    isImmutableDuck(instance, property)
  );
}

function hasMutableDuck(instance: any): boolean {
  return Object.keys(instance).some(property =>
    isMutableDuck(instance, property)
  );
}
