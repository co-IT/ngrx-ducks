import { MemoizedSelector, MemoizedSelectorWithProps } from '@ngrx/store';
import { Observable } from 'rxjs';

export type PickSelector = {
  pick: PickFunction;
};

export interface PickFunction {
  <TState, TProps, TResult>(
    selector: MemoizedSelectorWithProps<TState, TProps, TResult>,
    props: TProps
  ): Observable<TResult>;

  <TState, TResult>(selector: MemoizedSelector<TState, TResult>): Observable<
    TResult
  >;
}
