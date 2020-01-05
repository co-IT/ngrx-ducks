import { createDuck } from '../create-duck/create-duck';
import { getReducer } from './get-reducer';

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
