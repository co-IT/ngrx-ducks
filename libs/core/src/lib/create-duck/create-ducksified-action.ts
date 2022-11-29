import { MutableReducer } from '../create-mutable-duck/types';
import { duckIdentifierPropertyKey } from './duck-identifier-property-key';
import { DucksIdentifier } from './ducks-identifier';
import { NgRxDucksNotConnectedError } from './ngrx-ducks-not-connected.error';
import { DispatchDefinition, Reducer } from './types';

export function createDucksifiedAction<TType extends string, TPayload, TSlice>(
  type: TType,
  reducer:
    | DispatchDefinition<TPayload>
    | Reducer<TSlice, TPayload>
    | MutableReducer<TSlice, TPayload>
    | undefined,
  identifier: DucksIdentifier
) {
  const action: any = (payload?: TPayload) => ({ type, payload });

  action[duckIdentifierPropertyKey] = identifier;
  action.type = type;
  action.reducer = reducer;
  action.dispatch = () => {
    throw new NgRxDucksNotConnectedError(type);
  };
  return action;
}
