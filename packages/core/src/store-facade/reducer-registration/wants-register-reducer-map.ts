import {
  StoreFacadeConfiguration,
  StoreFacadeConfigurationWithSlice
} from './store-facade.configuration';

export function wantsToRegisterReducerMap(
  configuration: StoreFacadeConfiguration
): configuration is StoreFacadeConfigurationWithSlice {
  return !!configuration.slice;
}
