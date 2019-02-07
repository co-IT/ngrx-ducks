import { Store } from '@ngrx/store';
import { actionCreatorFor } from '../actions';
import { methodsFrom } from '../class';
import { ClassWithActionAnnotations, Duck } from '../typings';
import { pickFactory } from './pick-factory';
/**
 * Transforms methods of a class to self dispatching functions providing
 * a typed API.
 *
 * @param Token Class Token having @Action annotations and effect() properties
 * @param store Redux store instance providing dispatch method
 */
export function createDuckService<T extends new () => InstanceType<T>>(
  Token: T,
  store: Store<unknown>
): Duck<InstanceType<T>> {
  const instance: ClassWithActionAnnotations<T> = new Token();
  const methodNames = methodsFrom(Token);

  const reducerDispatchers = extractReducerDispatchers<T>(
    methodNames,
    instance,
    store
  );

  const effectDispatchers = extractEffectDispatchers<T>(instance, store);

  return {
    ...instance,
    ...reducerDispatchers,
    ...effectDispatchers,
    ...pickFactory(store)
  };
}

/**
 * Looks for properties having the signature of effect dispatchers.
 * Transforms them to self dispatching actions.
 *
 * @param instance May provide members that trigger an effect
 * @param store Redux store instance providing dispatch method
 */
function extractEffectDispatchers<T extends new () => InstanceType<T>>(
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

/**
 * Transforms each method of the class to a self dispatching action.
 *
 * @param methodNames Method members of the class
 * @param instance May provide members that are annotated with @Action
 * @param store Redux store instance providing dispatch method
 */
function extractReducerDispatchers<T extends new () => InstanceType<T>>(
  methodNames: string[],
  instance: ClassWithActionAnnotations<T>,
  store: Store<unknown>
) {
  return methodNames.reduce((service: any, method) => {
    const type = instance[method].wiredAction.type;
    service[method] = (payload: unknown) => store.dispatch({ type, payload });
    service[method].action = actionCreatorFor(type);
    return service;
  }, {}) as any;
}
