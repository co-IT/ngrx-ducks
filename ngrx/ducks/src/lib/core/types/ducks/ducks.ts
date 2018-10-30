import { Duck } from './duck';
import { Observable } from 'rxjs';
import { MemoizedSelector } from '@ngrx/store';

export type Selector = {
  pick<TState, TResult>(
    selector: MemoizedSelector<TState, TResult>
  ): Observable<TResult>;
};

export type Ducks<TDucks> = { [TDuck in keyof TDucks]: Duck<TDucks[TDuck]> } &
  Selector;
