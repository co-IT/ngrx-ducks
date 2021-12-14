import { Store } from '@ngrx/store';
import { connectDispatchers } from './connect-dispatchers';
import { connectUseSelect } from './connect-use-select';
import { connectSelectors } from './connect-selectors';
import { StoreChunkConfiguration } from '../reducer-registration';

export function connect(
  Token: new () => InstanceType<any>,
  store: Store,
  configuration?: StoreChunkConfiguration
) {
  const instance = new Token();
  Object.keys(instance).forEach(property => {
    connectDispatchers(instance, property, store, configuration);
    connectSelectors(instance, property, store);
    connectUseSelect(instance, property, store);
  });
  return instance;
}
