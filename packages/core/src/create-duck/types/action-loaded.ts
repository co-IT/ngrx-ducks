import { FunctionWithParametersType } from '@ngrx/store';
import { TypedAction } from './typed-action';

export type ActionLoaded<
  TType extends string,
  TPayload
> = FunctionWithParametersType<
  [TPayload],
  {
    payload: TPayload;
  } & TypedAction<TType>
> &
  TypedAction<TType>;
