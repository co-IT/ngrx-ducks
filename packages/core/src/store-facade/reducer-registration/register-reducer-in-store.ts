import { ɵɵinject } from '@angular/core';
import { AnnotationTarget } from '../annotation-target';
import { ReducerRegistrator } from '../reducer-registrator.service';
import { retrieveReducer } from './retrieve-reducer';
import { StoreFacadeConfiguration } from './store-facade.configuration';
import { wantsToRegisterReducerMap } from './wants-register-reducer-map';
import { wantsToRegisterPlainReducer } from './wants-to-register-plain-reducer';

export function registerReducerInStore(
  configuration: StoreFacadeConfiguration,
  constructor: AnnotationTarget
) {
  const reducerRegistrator: ReducerRegistrator = ɵɵinject(ReducerRegistrator);

  if (wantsToRegisterPlainReducer(configuration)) {
    const { feature, defaults } = configuration;
    const reducer = retrieveReducer(defaults, constructor);

    reducerRegistrator.register(feature, reducer);
  }

  if (wantsToRegisterReducerMap(configuration)) {
    const { feature, slice, defaults } = configuration;
    const reducer = retrieveReducer(defaults, constructor);

    if (slice) {
      reducerRegistrator.register(feature, { [slice]: reducer });
    }
  }
}
