import { Action, ActionReducer } from '@ngrx/store';
import { Draft, produce } from 'immer';
import { Constructable } from '../get-actions/constructable';
import { resolveReducers } from '../get-reducer';

export function getMutableReducer<TState>(
  initialState: TState,
  Token: Constructable
): ActionReducer<TState, Action> {
  const instance = new Token();
  const caseReducers = resolveReducers(instance);

  const reducer = (draft: Draft<TState>, action: Action) => {
    caseReducers[action.type]?.(draft, (action as any).payload);
  };

  return produce(reducer, initialState);
}
