import { StoreFacadeConfiguration } from './store-facade.configuration';

export function wantsToRegisterPlainReducer(
  configuration: StoreFacadeConfiguration
): boolean {
  return !configuration.slice;
}
