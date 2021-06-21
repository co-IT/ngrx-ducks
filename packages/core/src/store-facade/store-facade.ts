import { ɵɵdefineInjectable, ɵɵinject } from '@angular/core';
import { ActionReducer, Store } from '@ngrx/store';
import { getMutableReducer } from '../get-mutable-reducer/get-mutable-reducer';
import { getReducer } from '../get-reducer';
import { AnnotationTarget } from './annotation-target';
import { connect, isImmutableDuck, isMutableDuck } from './connect';
import { ReducerRegistrator } from './reducer-registrator.service';
import {
  StoreFacadeConfiguration,
  StoreFacadeConfigurationWithSlice
} from './store-facade.configuration';

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
    const { feature, defaults } = configuration;
    const reducer = retrieveReducer(defaults, constructor);

    reducerRegistrator.register(feature, reducer);
  }

  if (wantsToReducerReducerMap(configuration)) {
    const { feature, slice, defaults } = configuration;
    const reducer = retrieveReducer(defaults, constructor);

    reducerRegistrator.register(feature, { [slice]: reducer });
  }
}

function wantsToRegisterPlainReducer(
  configuration: StoreFacadeConfiguration
): boolean {
  return !configuration.slice;
}

function wantsToReducerReducerMap(
  configuration: StoreFacadeConfiguration
): configuration is StoreFacadeConfigurationWithSlice {
  return !!configuration.slice;
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
