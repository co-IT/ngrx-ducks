import { ActionCreator } from '@ngrx/store';
import { createDucksifiedAction } from '../create-duck';
import { ActionConditional, DispatchDefinition } from '../create-duck/types';
import { MutableReducer } from './types';

export function createMutableDuck<TType extends string, TPayload = undefined>(
  type: TType,
  dispatch?: DispatchDefinition<TPayload>
): ActionConditional<TType, TPayload>;
export function createMutableDuck<
  TType extends string,
  TPayload = undefined,
  TSlice = undefined
>(
  type: TType,
  reducer: MutableReducer<TSlice, TPayload>
): ActionConditional<TType, TPayload>;
export function createMutableDuck<TType extends string, TPayload, TSlice>(
  type: TType,
  reducer?: DispatchDefinition<TPayload> | MutableReducer<TSlice, TPayload>
): ActionCreator<TType> {
  return createDucksifiedAction<TType, TPayload, TSlice>(type, reducer);
}
