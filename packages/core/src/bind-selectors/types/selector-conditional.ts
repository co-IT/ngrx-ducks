import { MemoizedSelector } from '@ngrx/store';
import { Observable } from 'rxjs';

export type SelectorConditional<
  T extends MemoizedSelector<any, any>
> = T extends MemoizedSelector<any, infer TResult>
  ? Observable<TResult>
  : never;
