import { Action } from '@ngrx/store';
import { Observable, OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

export type ActionFromRealEffectDispatcher<T> = T extends {
  dispatch: () => void;
}
  ? { type: string }
  : T extends {
      dispatch: (payload: infer TPayload) => void;
    }
  ? { type: string; payload: TPayload }
  : never;

export type RealEffectDispatcher<T> = T extends {
  type: string;
  dispatch: () => void;
}
  ? {
      type: string;
      dispatch: () => void;
    }
  : T extends { type: string; dispatch: (payload: infer TPayload) => void }
  ? { type: string; dispatch: (payload: TPayload) => void }
  : never;

export function whereType<T = RealEffectDispatcher<unknown>>(
  actions: T | T[]
): OperatorFunction<Action, ActionFromRealEffectDispatcher<T>> {
  return function(
    source$: Observable<Action>
  ): Observable<ActionFromRealEffectDispatcher<T>> {
    return Array.isArray(actions)
      ? source$.pipe(
          filter(action => actions.some(a => (a as any).type === action.type))
        )
      : (source$.pipe(
          filter(action => action.type === (actions as any).type)
        ) as any);
  };
}
