import { ActionCreator } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import {
  ActionLoaded,
  ActionPlain,
  DispatchLoaded,
  DispatchPlain,
  DucksIdentifier
} from '../create-duck/create-duck';

export type Constructable = new (...args: any) => any;

export type ActionCreatorCandidates<TClass> = {
  [TMember in keyof TClass]: TClass[TMember] extends TypedAction<infer TType> &
    DispatchPlain
    ? ActionPlain<TType>
    : TClass[TMember] extends DispatchLoaded<infer TPayload> &
        TypedAction<infer TType>
    ? ActionLoaded<TType, TPayload>
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
  const properties = Object.keys(instance);

  return properties.reduce((actions, property) => {
    return instance[property].__ngrx_ducks__id === DucksIdentifier.Duck
      ? { ...actions, [property]: instance[property] }
      : actions;
  }, {}) as any;
}
