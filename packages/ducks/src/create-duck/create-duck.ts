import { ActionCreator } from '@ngrx/store';
import {
  FunctionWithParametersType,
  TypedAction
} from '@ngrx/store/src/models';
import { CreateDuckNotConnectedError } from './create-duck-not-connected.error';

export enum DucksIdentifier {
  Duck,
  DuckDispatcherPlain,
  DuckDispatcherPayload
}

export declare type DispatchDefinition<TPayload> = TPayload extends boolean
  ? (
      payload: boolean
    ) => void & {
      __ngrx_ducks__id: DucksIdentifier.DuckDispatcherPayload;
    }
  : TPayload extends undefined
  ? () => void & {
      __ngrx_ducks__id: DucksIdentifier.DuckDispatcherPlain;
    }
  : (
      payload: TPayload
    ) => void & {
      __ngrx_ducks__id: DucksIdentifier.DuckDispatcherPayload;
    };

export function dispatch<TPayload>(): DispatchDefinition<TPayload> {
  const dispatcherDefinition = (payload: TPayload) => payload;
  dispatcherDefinition.id = DucksIdentifier.DuckDispatcherPlain;

  return dispatcherDefinition as any;
}

type ReducerPlain<TSlice> = (slice: TSlice) => TSlice;
type ReducerPayload<TSlice, TPayload> = (
  slice: TSlice,
  payload: TPayload
) => TSlice;

type Reducer<TSlice, TPayload> = TPayload extends undefined
  ? ReducerPlain<TSlice>
  : ReducerPayload<TSlice, TPayload>;

export declare type ActionPlain<TType extends string> = ActionCreator<
  TType,
  () => TypedAction<TType>
>;

export declare type ActionLoaded<
  TType extends string,
  TPayload
> = FunctionWithParametersType<
  [TPayload],
  {
    payload: TPayload;
  } & TypedAction<TType>
> &
  TypedAction<TType>;

// @ts-ignore
export declare type DispatchPlain = { dispatch(): void };
export declare type DispatchLoaded<TPayload> = {
  dispatch(payload: TPayload): void;
};

declare type ActionConditional<
  TType extends string,
  TPayload
> = TPayload extends undefined
  ? ActionPlain<TType> & DispatchPlain
  : ActionLoaded<TType, TPayload> & DispatchLoaded<TPayload>;

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
): ActionLoaded<TType, TPayload>;
export function createDuck<TType extends string, TPayload>(
  type: TType,
  reducer?: DispatchDefinition<TPayload> | Function
): ActionCreator<TType> {
  const action: any = (payload?: TPayload) =>
    !payload ? { type } : { type, payload };

  action.__ngrx_ducks__id = DucksIdentifier.Duck;
  action.type = type;
  action.reducer = reducer;
  action.dispatch = () => {
    throw new CreateDuckNotConnectedError(type);
  };

  return action;
}
