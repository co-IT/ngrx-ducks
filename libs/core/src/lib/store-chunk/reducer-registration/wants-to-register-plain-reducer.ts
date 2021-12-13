import { StoreChunkConfiguration } from './store-chunk.configuration';
import { wantsToRegisterReducerMap } from './wants-register-reducer-map';

export function wantsToRegisterPlainReducer(
  configuration: StoreChunkConfiguration
): boolean {
  return !wantsToRegisterReducerMap(configuration);
}
