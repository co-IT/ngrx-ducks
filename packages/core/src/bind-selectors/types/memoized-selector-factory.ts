import { MemoizedSelector } from '@ngrx/store';

export type MemoizedSelectorFactory<T1, T2> = (
  ...args: any
) => MemoizedSelector<T1, T2>;
