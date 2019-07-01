import { Store } from '@ngrx/store';
import { ClassWithActionAnnotations } from '../../typings';

/**
 * Looks for properties having the signature of effect dispatchers.
 * Transforms them to self dispatching actions.
 *
 * @param instance May provide members that trigger an effect
 * @param store Redux store instance providing dispatch method
 */
export function extractEffectDispatchers<T extends new () => InstanceType<T>>(
  instance: ClassWithActionAnnotations<T>,
  store: Store<unknown>
) {
  const propertyNames = Object.getOwnPropertyNames(instance);
  return propertyNames.reduce((service: any, property) => {
    if (instance[property] && (instance[property] as any).type) {
      service[property] = instance[property];
      service[property].dispatch = (payload: unknown) =>
        store.dispatch((instance[property] as any).action(payload));
    }
    return service;
  }, {});
}
