import { ɵɵdefineInjectable, ɵɵinject } from '@angular/core';
import { Store } from '@ngrx/store';
import { connect } from './connect';

interface AnnotationTarget {
  new (): InstanceType<any>;
  ɵfac: Function;
  ɵprov: any;
}

export function StoreFacade() {
  return function(constructor: AnnotationTarget) {
    constructor.ɵfac = notConstructableError;
    constructor.ɵprov = ɵɵdefineInjectable({
      token: constructor,
      providedIn: 'root',
      factory() {
        return connect(
          constructor,
          ɵɵinject(Store)
        );
      }
    });

    return constructor;
  };
}

export function notConstructableError() {
  throw new Error('ɵfac: Cannot create class directly.');
}
