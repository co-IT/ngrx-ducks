import { ɵɵdefineInjectable, ɵɵinject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AnnotationTarget } from './annotation-target';
import { connect } from './connect';
import { notConstructableError } from './not-constructable-error';
import {
  registerReducerInStore,
  StoreFacadeConfiguration
} from './reducer-registration';

/**
 * @deprecated since version 13. Use StoreChunk instead.
 */
export const StoreFacade = StoreChunk;

export function StoreChunk<TState = any>(
  config?: StoreFacadeConfiguration<TState>
) {
  return function (constructor: AnnotationTarget) {
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
