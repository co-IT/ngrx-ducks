import {
  MemoizedSelector,
  MemoizedSelectorWithProps,
  select,
  Store
} from '@ngrx/store';
import { Observable } from 'rxjs';
import { PickSelector } from '../typings';

export function pickFactory(store: Store<any>): PickSelector {
  return {
    pick
  };

  function pick<TState, TProps, TResult>(
    selector: MemoizedSelectorWithProps<TState, TProps, TResult>,
    props: TProps
  ): Observable<TResult>;
  function pick<TState, TResult>(
    selector: MemoizedSelector<TState, TResult>
  ): Observable<TResult>;
  function pick<TState, TProps, TResult>(
    selector:
      | MemoizedSelector<TState, TResult>
      | MemoizedSelectorWithProps<TState, TProps, TResult>,
    props?: TProps
  ): Observable<TResult> {
    if (!props) {
      return store.pipe(select(selector));
    }

    return store.pipe(select(selector, props));
  }
}
