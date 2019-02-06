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
  return methodNames.reduce(
    (service: any, method) => {
      const type = instance[method].wiredAction.type;
      service[method] = (payload: unknown) => store.dispatch({ type, payload });
      service[method].action = actionCreatorFor(type);
      return service;
    },
    { ...instance }
  ) as any;
}
