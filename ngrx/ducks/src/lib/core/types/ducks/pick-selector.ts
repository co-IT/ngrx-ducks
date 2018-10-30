import { MemoizedSelector } from '@ngrx/store';
import { Observable } from 'rxjs';

export type PickSelector = {
  pick<TState, TResult>(
    selector: MemoizedSelector<TState, TResult>
  ): Observable<TResult>;
};
