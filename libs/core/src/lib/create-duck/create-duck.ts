import { ActionCreator } from '@ngrx/store';
import { createDucksifiedAction } from './create-ducksified-action';
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
  return createDucksifiedAction<TType, TPayload, TSlice>(
    type,
    reducer,
    DucksIdentifier.Duck
  );
}
