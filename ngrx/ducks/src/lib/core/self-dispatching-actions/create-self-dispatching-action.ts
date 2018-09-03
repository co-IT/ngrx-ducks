import { SelfDispatchingAction } from '../types';
import { Store } from '../types/__internal__/';

export function createSelfDispatchingAction<TDuck>(
  duck: TDuck,
  store: Store
): SelfDispatchingAction<TDuck> {
  const selfDispatchingAction: any = (payload: any) =>
    store.dispatch((duck as any)(payload));

  selfDispatchingAction.plain = duck;

  return selfDispatchingAction;
}
