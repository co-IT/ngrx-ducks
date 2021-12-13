import {
  StoreChunkConfiguration,
  StoreChunkConfigurationWithSlice
} from './store-chunk.configuration';

export function wantsToRegisterReducerMap(
  configuration: StoreChunkConfiguration
): configuration is StoreChunkConfigurationWithSlice {
  return Object.keys(configuration).includes('slice');
}
