import { StoreChunkConfiguration } from '../reducer-registration';

export function inferTypePrefixFromFeatureName(
  configuration: Pick<StoreChunkConfiguration, 'feature'> | undefined
) {
  if (!configuration?.feature) return '';

  return `[${configuration.feature.toUpperCase()}] `;
}
