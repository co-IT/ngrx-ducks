import { ActionCreator } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { createDuck, DucksIdentifier } from '../create-duck/create-duck';

describe('get-actions', () => {
  describe('When a class contains a duck', () => {
    it('extracts the duck', () => {
      class Facade {
        hello = createDuck('Hello');
      }

      const actions = getActions(Facade);
      expect(actions.hello.type).toBe('Hello');
    });
  });
});
export type Constructable = new (...args: any) => any;

export type ActionCreatorCandidates<TClass> = {
  [TMember in keyof TClass]: TClass[TMember] extends ActionCreator<infer TType>
    ? ActionCreator<TType, () => TypedAction<TType>>
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

// class Obj {
//   isTrue = true;

//   obj = createDuck('huhu', dispatch<number>());
//   obi = createDuck('haha', (slice: string) => slice);
//   obu = createDuck('haha', (slice: string, payload: number) => slice);
// }
// const actions = getActions(Obj);
