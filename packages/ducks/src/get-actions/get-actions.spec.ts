import { ActionCreator } from '@ngrx/store';
import {
  FunctionWithParametersType,
  TypedAction
} from '@ngrx/store/src/models';
import {
  createDuck,
  dispatch,
  DispatchLoaded,
  DispatchPlain,
  DucksIdentifier
} from '../create-duck/create-duck';

describe('get-actions', () => {
  describe('When a class contains a duck', () => {
    const typeHello = 'Hello';
    const typeBye = 'Bye';

    class Facade {
      otherProperty = true;

      hello = createDuck(typeHello);
      bye = createDuck(typeBye, dispatch<boolean>());
    }

    it('extracts the action creator', () => {
      const actions = getActions(Facade);
      expect(actions.hello.type).toBe(typeHello);
    });

    it('provides a working action creator without payload', () => {
      const actions = getActions(Facade);
      const hello = actions.hello();
      expect(hello.type).toBe(typeHello);
    });

    it('provides a working action creator supporting payloads', () => {
      const actions = getActions(Facade);
      const bye = actions.bye(true);
      expect(bye.type).toBe(typeBye);
    });

    it('ignores each property not being duck', () => {
      const actions = getActions(Facade);
      expect((actions as any).otherProperty).toBeUndefined();
    });
  });
});
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
