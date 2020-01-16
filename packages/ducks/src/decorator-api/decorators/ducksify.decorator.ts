import { ɵɵdefineInjectable, ɵɵinject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ducksify } from '../ducks';
import { notConstructableError } from '../../store-facade/store-facade';
import { AnnotationTarget, DucksifyConfig } from '../typings';
import { InitialState } from './initial-state.decorator';

export function Ducksify<T>(config: DucksifyConfig<T>) {
  return function(constructor: AnnotationTarget) {
    constructor.ɵfac = notConstructableError;
    constructor.ɵprov = ɵɵdefineInjectable({
      token: constructor,
      providedIn: 'root',
      factory() {
        return ducksify(
          InitialState(config.initialState)(constructor),
          ɵɵinject(Store)
        );
      }
    });

    return constructor;
  };
}
