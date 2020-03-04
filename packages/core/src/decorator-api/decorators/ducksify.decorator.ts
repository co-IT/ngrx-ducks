import { ɵɵdefineInjectable, ɵɵinject } from '@angular/core';
import { Store } from '@ngrx/store';
import { notConstructableError } from '../../store-facade/store-facade';
import { ducksify } from '../ducks';
import { AnnotationTarget, DucksifyConfig } from '../typings';
import { InitialState } from './initial-state.decorator';

export function Ducksify<T>(config: DucksifyConfig<T>) {
  return function(constructor: AnnotationTarget) {
    InitialState(config.initialState)(constructor);
    constructor.ɵfac = notConstructableError;
    constructor.ɵprov = ɵɵdefineInjectable({
      token: constructor,
      providedIn: 'root',
      factory() {
        return ducksify(constructor, ɵɵinject(Store));
      }
    });

    return constructor;
  };
}
