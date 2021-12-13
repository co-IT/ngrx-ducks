import { MemoizedSelector } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MemoizedSelectorFactory } from './memoized-selector-factory';

export type SelectorConditional<
  T extends MemoizedSelector<any, any> | MemoizedSelectorFactory<any, any>
> = T extends MemoizedSelector<any, infer TResult>
  ? Observable<TResult>
  : T extends (...args: any[]) => MemoizedSelector<any, infer TResult>
  ? (...args: Parameters<T>) => Observable<TResult>
  : never;
