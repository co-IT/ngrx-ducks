import {
  ActionLoaded,
  ActionPlain,
  DispatchLoaded,
  DispatchPlain,
  TypedAction
} from '../create-duck/types';

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
