import { Action } from '@ngrx/store';
import { Observable, OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ActionFromEffectDispatcher, EffectDispatcher } from '../typings';

export function whereType<T = EffectDispatcher<unknown>>(
  actions: T | T[]
): OperatorFunction<Action, ActionFromEffectDispatcher<T>> {
  return function(
    source$: Observable<Action>
  ): Observable<ActionFromEffectDispatcher<T>> {
    return Array.isArray(actions)
      ? source$.pipe(
          filter(action => actions.some(a => (a as any).type === action.type))
        )
      : (source$.pipe(
          filter(action => action.type === (actions as any).type)
        ) as any);
  };
}
