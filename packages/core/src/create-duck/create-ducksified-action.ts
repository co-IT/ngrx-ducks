import { MutableReducer } from '../create-mutable-duck/types';
import { NgRxDucksNotConnectedError } from './create-duck-not-connected.error';
import { DucksIdentifier } from './ducks-identifier';
import { DispatchDefinition, Reducer } from './types';

export function createDucksifiedAction<TType extends string, TPayload, TSlice>(
  type: TType,
  reducer:
    | DispatchDefinition<TPayload>
    | Reducer<TSlice, TPayload>
    | MutableReducer<TSlice, TPayload>
    | undefined
) {
  const action: any = (payload?: TPayload) => ({ type, payload });

  action.__ngrx_ducks__id = DucksIdentifier.Duck;
  action.type = type;
  action.reducer = reducer;
  action.dispatch = () => {
    throw new NgRxDucksNotConnectedError(type);
  };
  return action;
}
