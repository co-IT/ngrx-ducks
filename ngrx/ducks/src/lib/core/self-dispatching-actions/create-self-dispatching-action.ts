import { Ducks } from '../types';
import { ActionDispatcher } from '../types/__internal__/';

export function createSelfDispatchingAction<TDuck>(
  duck: TDuck,
  store: ActionDispatcher
): Ducks<TDuck> {
  const selfDispatchingAction: any = (payload: any) =>
    store.dispatch((duck as any)(payload));

  selfDispatchingAction.plain = duck;

  return selfDispatchingAction;
}
