import { StoreMock } from '../../../test/mocks';
import { Action } from '../decorators';
import { createDuckService } from './create-duck-service';

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
