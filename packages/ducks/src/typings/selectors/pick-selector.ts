import { MemoizedSelector, MemoizedSelectorWithProps } from '@ngrx/store';
import { Observable } from 'rxjs';

export type PickSelector = {
  pick<TState, TProps, TResult>(
    selector: MemoizedSelectorWithProps<TState, TProps, TResult>,
    props: TProps
  ): Observable<TResult>;

  pick<TState, TResult>(
    selector: MemoizedSelector<TState, TResult>
  ): Observable<TResult>;
};
