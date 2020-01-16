import { ɵɵdefineInjectable, ɵɵinject } from '@angular/core';
import { Store } from '@ngrx/store';
import { connect } from './connect';

export function StoreFacade() {
  return function(token: new () => InstanceType<any>) {
    (token as any).ɵfac = function() {
      throw new Error('cannot create directly');
    };
    (token as any).ɵprov = ɵɵdefineInjectable({
      token,
      providedIn: 'root',
      factory: function() {
        return connect(
          token,
          ɵɵinject(Store)
        );
      }
    });
    return token;
  };
}
