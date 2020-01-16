import { Store } from '@ngrx/store';
export function connectDispatchers(
  instance: any,
  property: string,
  store: Store<unknown>
): void {
  const { type, dispatch } = instance[property];
  if (!dispatch) {
    return;
  }
  instance[property].dispatch = (payload?: any) =>
    !payload ? store.dispatch({ type }) : store.dispatch({ type, payload });
}
