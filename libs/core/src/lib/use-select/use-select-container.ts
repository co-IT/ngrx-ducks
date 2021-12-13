import { MemoizedSelector, MemoizedSelectorWithProps } from '@ngrx/store';
import { Observable } from 'rxjs';

export type UseSelectContainer = {
  select: SelectFunction;
};

export interface SelectFunction {
  <TState, TProps, TResult>(
    selector: MemoizedSelectorWithProps<TState, TProps, TResult>,
    props: TProps
  ): Observable<TResult>;

  <TState, TResult>(
    selector: MemoizedSelector<TState, TResult>
  ): Observable<TResult>;
}
