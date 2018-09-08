import { Duck } from '../types';
import { ExtractTypeFromWiredAction } from '../types/wired-actions/extract-type-from-wired-action';
import { ActionDispatcher } from '../types/__internal__';

export function createDuck<T>(
  wiredAction: T,
  store: ActionDispatcher
): Duck<ExtractTypeFromWiredAction<T>> {
  const duck: any = (payload: any) =>
    store.dispatch((wiredAction as any)(payload));

  duck.plain = wiredAction;

  return duck;
}
