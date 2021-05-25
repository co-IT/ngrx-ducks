import { Action, ActionReducer } from '@ngrx/store';
import { Constructable } from '../get-actions/constructable';
import { resolveReducers } from './resolve-reducers';

export function getReducer<TState>(
  initialState: TState,
  Token: Constructable
): ActionReducer<TState, Action> {
  const instance = new Token();

  const caseReducers: {
    [key: string]: Function;
  } = resolveReducers(instance);

  return function(state: TState = initialState, action: Action) {
    return caseReducers[action.type]
      ? caseReducers[action.type](state, (action as any).payload)
      : state;
  };
}
