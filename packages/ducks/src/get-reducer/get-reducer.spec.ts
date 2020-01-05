import { Action, ActionReducer } from '@ngrx/store';
import { createDuck } from '../create-duck/create-duck';
import { Constructable } from '../get-actions';

describe('get-reducer', () => {
  describe('When a class contains ducks', () => {
    class Facade {
      add = createDuck(
        'add',
        (slice: number, payload: number) => slice + payload
      );
      increment = createDuck('increment', (slice: number) => ++slice);
      decrement = createDuck('decrement', (slice: number) => --slice);
    }

    it('gets valid reducer function', () => {
      const reducer = getReducer(0, Facade);
      const facade = new Facade();
      const state = reducer(0, facade.increment());

      expect(state).toBe(1);
    });

    it('recognizes all reducer functions of facade', () => {
      const reducer = getReducer(0, Facade);
      const facade = new Facade();

      let state = reducer(0, facade.increment());
      state = reducer(state, facade.decrement());

      expect(state).toBe(0);
    });

    it('recognizes reducer functions requiring payload', () => {
      const reducer = getReducer(0, Facade);
      const facade = new Facade();

      let state = reducer(0, facade.increment());
      state = reducer(state, facade.decrement());
      state = reducer(state, facade.add(10));

      expect(state).toBe(10);
    });
  });
});

export function getReducer<TState>(
  initialState: TState,
  Token: Constructable
): ActionReducer<TState, Action> {
  const instance = new Token();

  const caseReducers: { [key: string]: Function } = Object.keys(
    instance
  ).reduce((reducers, property) => {
    return !instance[property].reducer
      ? reducers
      : {
          ...reducers,
          [instance[property].type]: instance[property].reducer
        };
  }, {});

  return function(state: TState = initialState, action: Action) {
    return caseReducers[action.type]
      ? caseReducers[action.type](state, (action as any).payload)
      : state;
  };
}
