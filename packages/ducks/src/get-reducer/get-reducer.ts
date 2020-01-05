import { Action, ActionReducer } from '@ngrx/store';
import { Constructable } from '../get-actions';

export function getReducer<TState>(
  initialState: TState,
  Token: Constructable
): ActionReducer<TState, Action> {
  const instance = new Token();
  const caseReducers: {
    [key: string]: Function;
  } = Object.keys(instance).reduce((reducers, property) => {
    return !instance[property].reducer
      ? reducers
      : {
          ...reducers,
          [instance[property].type]: instance[property].reducer
        };
  }, {});
  return function(state: TState = initialState, action: Action) {
    return caseReducers[action.type]
      ? caseReducers[action.type](state, (action as any).payload)
      : state;
  };
}
