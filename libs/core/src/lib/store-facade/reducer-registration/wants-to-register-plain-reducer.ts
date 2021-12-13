import { StoreFacadeConfiguration } from './store-facade.configuration';
import { wantsToRegisterReducerMap } from './wants-register-reducer-map';

export function wantsToRegisterPlainReducer(
  configuration: StoreFacadeConfiguration
): boolean {
  return !wantsToRegisterReducerMap(configuration);
}
