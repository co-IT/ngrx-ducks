import { MissingActionDecoratorError, throwIf } from '../errors';
import { ClassWithActionAnnotations } from '../typings';

export function extractWiredAction<T>(
  instance: ClassWithActionAnnotations<T>,
  method: string
) {
  throwIf(
    !instance[method].wiredAction,
    new MissingActionDecoratorError(instance.constructor.name, method)
  );
  const type = instance[method].wiredAction.type;
  const wiredAction: any = (payload: any) => ({
    type,
    payload
  });
  wiredAction.type = type;
  wiredAction.caseReducer = instance[method].wiredAction.caseReducer;
  return wiredAction;
}
