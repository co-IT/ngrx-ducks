import { TypedAction } from '@ngrx/store/src/models';
import {
  ActionLoaded,
  ActionPlain,
  DispatchLoaded,
  DispatchPlain
} from '../create-duck/create-duck';

export type ActionCreatorCandidates<TClass> = {
  [TMember in keyof TClass]: TClass[TMember] extends TypedAction<infer TType> &
    DispatchPlain
    ? ActionPlain<TType>
    : TClass[TMember] extends DispatchLoaded<infer TPayload> &
        TypedAction<infer TType>
    ? ActionLoaded<TType, TPayload>
    : TClass[TMember] extends object
    ? ActionCreatorCandidates<TClass[TMember]>
    : never;
};
