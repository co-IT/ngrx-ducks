import { MemoizedSelectorWithProps, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UseSelectContainer } from './use-select-container';

export function useSelectorFactory(store: Store<any>): UseSelectContainer {
  return {
    select: pick
  };

  function pick<TState, TProps, TResult>(
    selector: MemoizedSelectorWithProps<TState, TProps, TResult>,
    props: TProps
  ): Observable<TResult>;
  function pick<TState, TResult>(
    selector: (state: TState) => TResult
  ): Observable<TResult>;
  function pick<TState, TProps, TResult>(
    selector:
      | ((state: TState) => TResult)
      | MemoizedSelectorWithProps<TState, TProps, TResult>,
    props?: TProps
  ): Observable<TResult> {
    if (!props) {
      return store.pipe(select(selector as any));
    }

    return store.pipe(select(selector as any, props));
  }
}
