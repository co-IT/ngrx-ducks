import { Duck } from '../types';
import { ExtractTypeFromWiredAction } from '../types/wired-actions/extract-type-from-wired-action';
import { Store } from '@ngrx/store';

export function createDuck<T>(
  wiredAction: T,
  store: Store<unknown>
): Duck<ExtractTypeFromWiredAction<T>> {
  const duck: any = (payload: any) =>
    store.dispatch((wiredAction as any)(payload));

  duck.plain = wiredAction;

  return duck;
}
