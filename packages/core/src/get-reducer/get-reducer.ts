import { Action, ActionReducer } from '@ngrx/store';
import { Constructable } from '../get-actions/constructable';

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

function resolveReducers(
  instance: any,
  collectedReducers: { [key: string]: Function } = {}
): { [key: string]: Function } {
  return Object.keys(instance).reduce(
    (reducers, property) =>
      !instance[property].reducer
        ? resolveReducers(instance[property], reducers)
        : {
            ...reducers,
            [instance[property].type]: instance[property].reducer
          },
    collectedReducers
  );
}
