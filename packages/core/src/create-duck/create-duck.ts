import { ActionCreator } from '@ngrx/store';
import { NgRxDucksNotConnectedError } from './create-duck-not-connected.error';
import { DucksIdentifier } from './ducks-identifier';
import { ActionConditional, DispatchDefinition, Reducer } from './types';

export function createDuck<TType extends string, TPayload = undefined>(
  type: TType,
  dispatch?: DispatchDefinition<TPayload>
): ActionConditional<TType, TPayload>;
export function createDuck<
  TType extends string,
  TPayload = undefined,
  TSlice = undefined
>(
  type: TType,
  reducer: Reducer<TSlice, TPayload>
): ActionConditional<TType, TPayload>;
export function createDuck<TType extends string, TPayload, TSlice>(
  type: TType,
  reducer?: DispatchDefinition<TPayload> | Reducer<TSlice, TPayload>
): ActionCreator<TType> {
  const action: any = (payload?: TPayload) => ({ type, payload });

  action.__ngrx_ducks__id = DucksIdentifier.Duck;
  action.type = type;
  action.reducer = reducer;
  action.dispatch = () => {
    throw new NgRxDucksNotConnectedError(type);
  };

  return action;
}
