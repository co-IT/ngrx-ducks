import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StoreMock } from '../../test/mocks';
import { Action } from '../decorators';
import { MissingActionDecoratorError } from '../errors';
import { Duck } from '../typings';
import { ducksify } from './ducksify';
import { effect } from './effect';

const counter = createFeatureSelector<number>('counter');
const current = createSelector(
  counter,
  count => count
);

class MyDuck {
  doAsync = effect('doAsync');
  doAsyncWithPayload = effect<number>('doAsyncWithPayload');

  current = current;

  @Action('greet')
  greet(state: number) {
    return state;
  }

  @Action('add')
  add(state: number, payload: number) {
    return state + payload;
  }
}

describe('factory: ducksify', () => {
  let store: StoreMock<{}>;
  let dispatch: jest.SpyInstance;
  let sut: Duck<MyDuck>;

  beforeEach(() => {
    store = new StoreMock({});
    dispatch = jest.spyOn(store, 'dispatch');
    sut = ducksify(MyDuck, store as any);
  });

  describe('When a class member is annotated with @Action', () => {
    it('should dispatch an action when method it is executed', () => {
      sut.greet();
      expect(dispatch).toHaveBeenCalledWith({ type: 'greet' });
    });

    it('should provide an action creator', () => {
      expect(sut.greet.action()).toEqual({ type: 'greet' });
    });

    /** @deprecated */
    it('should provide an action creator', () => {
      expect(sut.greet.plain()).toEqual({ type: 'greet' });
    });

    it('should allow to directly access the action type', () => {
      expect(sut.greet.type).toBe('greet');
    });

    it('should dispatch an action with payload when it is executed', () => {
      sut.add(1);
      expect(dispatch).toHaveBeenCalledWith({ type: 'add', payload: 1 });
    });

    it('should an action creator taking a payload', () => {
      expect(sut.add.action(1)).toEqual({ type: 'add', payload: 1 });
    });

    /** @deprecated */
    it('should an action creator taking a payload', () => {
      expect(sut.add.plain(1)).toEqual({ type: 'add', payload: 1 });
    });
  });

  describe('When an effect trigger is added', () => {
    it('should dispatch the configured action', () => {
      sut.doAsync.dispatch();
      expect(dispatch).toHaveBeenCalledWith({ type: 'doAsync' });
    });

    it('should provide an action creator', () => {
      const action = sut.doAsync.action();
      expect(action.type).toBe('doAsync');
    });
  });

  describe('When an effect trigger with payload is added', () => {
    it('should dispatch the configured action with a payload', () => {
      sut.doAsyncWithPayload.dispatch(0);
      expect(dispatch).toHaveBeenCalledWith({
        type: 'doAsyncWithPayload',
        payload: 0
      });
    });

    it('should provide an action creator', () => {
      const action = sut.doAsyncWithPayload.action(1);
      expect(action).toEqual({ type: 'doAsyncWithPayload', payload: 1 });
    });
  });

  describe('When @Action is missing on a method', () => {
    class Some {
      greet() {
        /* intentionally left blank */
      }
    }

    it('should raise an error', () => {
      const err = new MissingActionDecoratorError(Some.name, 'greet');
      expect(() => ducksify(Some, store as any)).toThrowError(err);
    });
  });

  describe('When a Duck contains a selector', () => {
    /** smoke test, just want to ensure the right type inference */
    it('should be possible to use the selector directly', () => {
      expect(typeof sut.current.subscribe).toBe('function');
    });
  });
});
