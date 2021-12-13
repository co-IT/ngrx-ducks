import { Store } from '@ngrx/store';
import { connectDispatchers } from './connect-dispatchers';
import { connectPick } from './connect-pick';
import { connectSelectors } from './connect-selectors';

export function connect(Token: new () => InstanceType<any>, store: Store) {
  const instance = new Token();
  Object.keys(instance).forEach(property => {
    connectDispatchers(instance, property, store);
    connectSelectors(instance, property, store);
    connectPick(instance, property, store);
  });
  return instance;
}
