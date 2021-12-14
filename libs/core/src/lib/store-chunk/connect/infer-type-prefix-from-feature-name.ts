import { StoreChunkConfiguration } from '../reducer-registration';

export function inferTypePrefixFromFeatureName(
  configuration:
    | Pick<StoreChunkConfiguration, 'feature' | 'enableActionTypePrefixing'>
    | undefined
) {
  if (!configuration?.feature || !configuration.enableActionTypePrefixing)
    return '';

  return `[${configuration.feature.toUpperCase()}] `;
}
