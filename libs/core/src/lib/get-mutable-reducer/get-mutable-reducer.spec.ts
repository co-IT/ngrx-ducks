import { createMutableDuck } from '../create-mutable-duck/create-mutable-duck';
import { getMutableReducer } from './get-mutable-reducer';

describe(getMutableReducer.name, () => {
  describe('When a mutable reducer is created', () => {
    interface CounterSlice {
      count: number;
    }

    class Facade {
      add = createMutableDuck('add', (slice: CounterSlice, payload: number) => {
        slice.count += payload;
      });
      increment = createMutableDuck('increment', (slice: CounterSlice) => {
        slice.count += 1;
      });
      decrement = createMutableDuck('decrement', (slice: CounterSlice) => {
        slice.count -= 1;
      });
    }

    it('executes the case reducer correctly', () => {
      const facade = new Facade();
      const mutableReducer = getMutableReducer({ count: 0 }, Facade);
      const state = mutableReducer({ count: 5 }, facade.add(5));

      expect(state.count).toEqual(10);
    });
  });
});
