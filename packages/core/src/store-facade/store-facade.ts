import { ɵɵdefineInjectable, ɵɵinject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AnnotationTarget } from './annotation-target';
import { connect } from './connect';
import { notConstructableError } from './not-constructable-error';
import { registerReducerInStore } from './reducer-registration';
import { StoreFacadeConfiguration } from './reducer-registration/store-facade.configuration';

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
