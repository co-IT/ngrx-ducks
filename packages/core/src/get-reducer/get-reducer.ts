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
  return Object.keys(instance).reduce((reducers, property) => {
    if (instance[property].reducer) {
      return {
        ...reducers,
        [instance[property].type]: instance[property].reducer
      };
    } else if (
      isNoNgRxDuckPatchInternal(instance[property]) &&
      Object.keys(instance[property]).length > 0
    ) {
      return resolveReducers(instance[property], reducers);
    } else {
      return reducers;
    }
  }, collectedReducers);
}

function isNoNgRxDuckPatchInternal(object: any) {
  return Object.keys(object).every(
    property => !property.match(/__ngrx_ducks__/)
  );
}
