import { Store } from '@ngrx/store';
import { actionCreatorFor } from '../actions';
import { methodsFrom } from '../class';
import { ClassWithActionAnnotations, DuckService } from '../typings';

export function createDuckService<T extends new () => InstanceType<T>>(
  Token: T,
  store: Store<unknown>
): DuckService<InstanceType<T>> {
  const instance: ClassWithActionAnnotations<T> = new Token();
  const methodNames = methodsFrom(Token);
  const propertyNames = Object.getOwnPropertyNames(instance);

  const dispatchers = methodNames.reduce((service: any, method) => {
    const type = instance[method].wiredAction.type;
    service[method] = (payload: unknown) => store.dispatch({ type, payload });
    service[method].action = actionCreatorFor(type);
    return service;
  }, {}) as any;

  const effectDispatchers = propertyNames.reduce((service: any, property) => {
    if (instance[property] && (instance[property] as any).type) {
      service[property] = instance[property];
      service[property].dispatch = (payload: unknown) =>
        store.dispatch((instance[property] as any).action(payload));
    }

    return service;
  }, {});

  return { ...instance, ...dispatchers, effectDispatchers };
}
