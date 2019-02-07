import { StoreMock } from '../../../test/mocks';
import { Action } from '../decorators';
import { Duck } from '../typings';
import { createDuckService } from './create-duck-service';
import { effect } from './effect';

class MyDuck {
  doAsync = effect('doAsync');
  doAsyncWithPayload = effect<number>('doAsyncWithPayload');

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
  let store: StoreMock<unknown>;
  let dispatch: jest.SpyInstance;
  let sut: Duck<MyDuck>;

  beforeEach(() => {
    store = new StoreMock({});
    dispatch = jest.spyOn(store, 'dispatch');
    sut = createDuckService(MyDuck, store as any);
  });

  describe('When a class member is annotated with @Action', () => {
    it('should dispatch an action when method it is executed', () => {
      sut.greet();
      expect(dispatch).toHaveBeenCalledWith({ type: 'greet' });
    });

    it('should provide an action creator', () => {
      expect(sut.greet.action()).toEqual({ type: 'greet' });
    });

    it('should dispatch an action with payload when it is executed', () => {
      sut.add(1);
      expect(dispatch).toHaveBeenCalledWith({ type: 'add', payload: 1 });
    });

    it('should an action creator taking a payload', () => {
      expect(sut.add.action(1)).toEqual({ type: 'add', payload: 1 });
    });
  });

  describe('When a effect trigger is added', () => {
    it('should dispatch the configured action', () => {
      sut.doAsync.dispatch();
      expect(dispatch).toHaveBeenCalledWith({ type: 'doAsync' });
    });
  });

  describe('When a effect trigger with payload is added', () => {
    it('should dispatch the configured action with a payload', () => {
      sut.doAsyncWithPayload.dispatch(0);
      expect(dispatch).toHaveBeenCalledWith({
        type: 'doAsyncWithPayload',
        payload: 0
      });
    });
  });
});
