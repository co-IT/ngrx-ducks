import { ActionCreator } from '@ngrx/store';
import { TypedAction } from './typed-action';

export type ActionPlain<TType extends string> = ActionCreator<
  TType,
  () => TypedAction<TType>
>;
