import { Duck, WiredAction } from '../types';
import { ActionDispatcher } from '../types/__internal__/';

export type ExtractTypeFromWiredAction<T> = T extends WiredAction<infer U>
  ? U
  : never;

export function createSelfDispatchingAction<T>(
  wiredAction: T,
  store: ActionDispatcher
): Duck<ExtractTypeFromWiredAction<T>> {
  const duck: any = (payload: any) =>
    {
      console.log('Dispatching', payload)
      store.dispatch((wiredAction as any)(payload));}

  duck.plain = wiredAction;

  return duck;
}
