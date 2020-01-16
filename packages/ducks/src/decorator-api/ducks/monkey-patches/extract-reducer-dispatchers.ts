import { Store } from '@ngrx/store';
import { actionCreatorFor } from '../../actions';
import { MissingActionDecoratorError } from '../../errors';
import { ClassWithActionAnnotations } from '../../typings';
/**
 * Transforms each method of the class to a self dispatching action.
 *
 * @param methodNames Method members of the class
 * @param instance May provide members that are annotated with @Action
 * @param store Redux store instance providing dispatch method
 */
export function extractReducerDispatchers<T extends new () => InstanceType<T>>(
  methodNames: string[],
  instance: ClassWithActionAnnotations<T>,
  store: Store<unknown>
) {
  return methodNames
    .map(method => {
      if (!instance[method] || !instance[method].wiredAction) {
        throw new MissingActionDecoratorError(
          instance.constructor.name,
          method
        );
      }
      return method;
    })
    .reduce((service: any, method) => {
      const type = instance[method].wiredAction.type;
      service[method] = (payload: unknown) => store.dispatch({ type, payload });
      service[method].type = type;
      service[method].action = actionCreatorFor(type);
      // TODO: remove in next major release
      service[method].plain = service[method].action;
      return service;
    }, {});
}
