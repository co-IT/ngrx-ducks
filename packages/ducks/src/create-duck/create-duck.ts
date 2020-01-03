import { ActionCreator, createAction } from '@ngrx/store';
import {
  FunctionWithParametersType,
  TypedAction
} from '@ngrx/store/src/models';

export enum DucksIdentifier {
  DispatcherPlain,
  DispatcherReducer
}

export declare type DispatchDefinition<TPayload> = TPayload extends undefined
  ? () => void & { id: DucksIdentifier }
  : (payload: TPayload) => void & { id: DucksIdentifier };

export function dispatch<TPayload>(): DispatchDefinition<TPayload> {
  const dispatcherDefinition = (payload: TPayload) => payload;
  dispatcherDefinition.id = DucksIdentifier.DispatcherPlain;

  return dispatcherDefinition as any;
}

type ReducerPlain<TSlice> = (slice: TSlice) => TSlice;
type ReducerPayload<TSlice, TPayload> = (
  slice: TSlice,
  payload: TPayload
) => TSlice;

type Reducer<TSlice, TPayload> =
  | ReducerPlain<TSlice>
  | ReducerPayload<TSlice, TPayload>;

// @ts-ignore
const a = createAction('hello');

declare type ActionPlain<TType extends string> = ActionCreator<
  TType,
  () => TypedAction<TType>
>;

declare type ActionLoaded<
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
declare type DispatchPlain = { dispatch: () => void };
declare type DispatchLoaded<TPayload> = {
  dispatch: (payload: TPayload) => void;
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
export function createDuck<TType extends string, TPayload, TSlice>(
  type: TType,
  reducer: Reducer<TSlice, TPayload>
): ActionCreator<TType>;
export function createDuck<TType extends string, TPayload>(
  type: TType,
  _dispatchOrReducer: DispatchDefinition<TPayload> | Function = dispatch<void>()
): ActionCreator<TType> {
  const action = (payload?: TPayload) =>
    !payload ? { type } : { type, payload };

  (action as any).dispatch = () => {
    /* ... */
  };

  return action as any;
}
