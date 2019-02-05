import { Store } from '@ngrx/store';
import { StoreMock } from '../../../test/mocks';
import { methodsFrom } from '../class';
import { Action } from '../decorators';
import { ClassWithActionAnnotations } from '../typings';

class MyDuck {
  some: string;

  @Action('greet')
  greet(state: number) {
    return state;
  }

  @Action('add')
  add(state: number, payload: number) {
    return state + payload;
  }
}

describe('factory: createDuckService', () => {
  describe('When a class member is annotated with @Action', () => {
    it('should dispatch an action when method it is executed', () => {
      const store = new StoreMock({});
      const dispatch = spyOn(store, 'dispatch');

      const sut = createDuckService(MyDuck, store as any);

      sut.greet();
      expect(dispatch).toHaveBeenCalledWith({ type: 'greet' });
    });

    it('should provide an action creator', () => {
      const store = new StoreMock({});
      const sut = createDuckService(MyDuck, store as any);

      expect(sut.greet.action()).toEqual({ type: 'greet' });
    });

    it('should dispatch an action with payload when it is executed', () => {
      const store = new StoreMock({});
      const dispatch = spyOn(store, 'dispatch');

      const sut = createDuckService(MyDuck, store as any);

      sut.add(1);
      expect(dispatch).toHaveBeenCalledWith({ type: 'add', payload: 1 });
    });

    it('should an action creator taking a payload', () => {
      const store = new StoreMock({});
      const sut = createDuckService(MyDuck, store as any);

      expect(sut.add.action(1)).toEqual({ type: 'add', payload: 1 });
    });
  });
});

export function createDuckService<T extends new () => InstanceType<T>>(
  Token: T,
  store: Store<unknown>
): DuckService<InstanceType<T>> {
  const instance: ClassWithActionAnnotations<T> = new Token();
  const methodNames = methodsFrom(Token);

  return methodNames.reduce(
    (service: any, method) => {
      const type = instance[method].wiredAction.type;

      service[method] = (payload: unknown) => store.dispatch({ type, payload });
      service[method].action = actionCreatorFor(type);

      return service;
    },
    { ...instance }
  ) as any;
}

export type DuckService<T> = { [K in keyof T]: DuckActionDispatcher<T[K]> };

export type DuckActionDispatcher<T> = T extends ActionHandlerWithoutPayload<
  infer _TSlice
>
  ? (() => void) & PlainAction
  : T extends ActionHandlerWithPayload<infer _TSlice, infer TPayload>
  ? ((payload: TPayload) => void) & LoadedAction<TPayload>
  : never;

export type ActionHandlerWithPayload<TSlice, TPayload> = (
  state: TSlice,
  payload: TPayload
) => TSlice;

export type ActionHandlerWithoutPayload<TSlice> = (state: TSlice) => TSlice;

export interface PlainAction {
  action(): { type: string };
}

export interface LoadedAction<TPayload> {
  action(payload: TPayload): { type: string; payload: TPayload };
}

function actionCreatorFor(type: string) {
  return (payload: unknown | undefined) =>
    payload ? loadedAction(type, payload) : emptyAction(type);
}

function emptyAction<T extends new () => InstanceType<T>>(type: string) {
  return {
    type
  };
}

function loadedAction(type: string, payload: unknown) {
  return {
    type,
    payload
  };
}
