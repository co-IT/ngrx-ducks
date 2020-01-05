import { ActionCreator } from '@ngrx/store';
import {
  FunctionWithParametersType,
  TypedAction
} from '@ngrx/store/src/models';
import {
  DispatchLoaded,
  DispatchPlain,
  DucksIdentifier
} from '../create-duck/create-duck';

export type Constructable = new (...args: any) => any;

export type ActionCreatorCandidates<TClass> = {
  [TMember in keyof TClass]: TClass[TMember] extends TypedAction<infer TType> &
    DispatchPlain
    ? ActionCreator<TType, () => TypedAction<TType>>
    : TClass[TMember] extends DispatchLoaded<infer TPayload> &
        TypedAction<infer TType>
    ? FunctionWithParametersType<
        [TPayload],
        {
          payload: TPayload;
        } & TypedAction<TType>
      > &
        TypedAction<TType>
    : never
};

type ActionCreatorFilter<T> = ({
  [P in keyof T]: T[P] extends ActionCreator ? P : never
})[keyof T];

export type ActionCreators<T extends Constructable> = Pick<
  ActionCreatorCandidates<InstanceType<T>>,
  ActionCreatorFilter<InstanceType<T>>
>;

export function getActions<T extends Constructable>(
  Token: T
): ActionCreators<T> {
  const instance = new Token();
  const methodNames = Object.keys(instance);

  return methodNames.reduce((actions, methodName) => {
    return instance[methodName].__ngrx_ducks__id === DucksIdentifier.Duck
      ? { ...actions, [methodName]: instance[methodName] }
      : actions;
  }, {}) as any;
}
