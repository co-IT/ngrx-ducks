import { MemoizedSelector, select, Store } from '@ngrx/store';
import { PickSelector } from '../core/types';

export function pickFactory(store: Store<any>): PickSelector {
  return {
    pick<TState, TResult>(selector: MemoizedSelector<TState, TResult>) {
      return store.pipe(select(selector));
    }
  };
}
