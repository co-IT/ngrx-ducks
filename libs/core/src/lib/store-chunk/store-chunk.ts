import { inject, ɵɵdefineInjectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AnnotationTarget } from './annotation-target';
import { connect } from './connect';
import { notConstructableError } from './not-constructable-error';
import {
  registerReducerInStore,
  StoreChunkConfiguration
} from './reducer-registration';

/**
 * @deprecated since version 13. Use StoreChunk instead.
 */
export const StoreFacade = StoreChunk;

export function StoreChunk<TState = any>(
  config?: StoreChunkConfiguration<TState>
) {
  const configuration = mergeConfiguration(config);
  return function (constructor: AnnotationTarget) {
    constructor.ɵfac = notConstructableError;
    constructor.ɵprov = ɵɵdefineInjectable({
      token: constructor,
      providedIn: 'root',
      factory() {
        if (configuration) {
          registerReducerInStore(configuration, constructor);
        }

        return connect(constructor, inject(Store) as Store, configuration);
      }
    });

    return constructor as any;
  };
}

function mergeConfiguration(config: StoreChunkConfiguration | undefined) {
  return config && config.enableActionTypePrefixing === undefined
    ? { ...config, enableActionTypePrefixing: true }
    : config;
}
