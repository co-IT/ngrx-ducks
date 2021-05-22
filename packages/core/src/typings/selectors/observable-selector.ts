import { MemoizedSelector } from '@ngrx/store';
import { Observable } from 'rxjs';

export type ObservableSelector<T> = T extends MemoizedSelector<
  any,
  infer TResult
>
  ? Observable<TResult>
  : never;
