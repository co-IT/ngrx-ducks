import { Action as NgRxAction } from '@ngrx/store';
import { from, Observable, of } from 'rxjs';
import { StoreMock } from '../../../test/mocks';
import { Action } from '../decorators';
import { ducksify } from '../ducks';
import { Duck } from '../typings';
import { whereType } from './where-type';

describe('operators: whereType', () => {
  describe('effect dispatcher', () => {
    describe('When a type of a emitted action matches', () => {
      it('should pass the stream', done => {
        const action = { type: '[Counter]', payload: true };

        const booleanEffectDispatcher = effectDispatcher<number>(action.type);

        const actions$: Observable<NgRxAction> = of(action);

        actions$.pipe(whereType(booleanEffectDispatcher)).subscribe({
          next: ({ payload }) => {
            expect(payload).toBe(true);
            done();
          }
        });
      });

      it('SMOKE: should not provide a payload when it is not defined', done => {
        const action = { type: '[Counter]', payload: true };

        const noPayload = {
          type: action.type,
          dispatch: () => ({})
        };

        const actions$: Observable<NgRxAction> = of(action);

        actions$.pipe(whereType(noPayload)).subscribe({
          next: a => {
            expect(a.type).toBe(action.type);
            done();
          }
        });
      });
    });

    describe('When a type of a emitted action does not match', () => {
      it('should not pass the stream', () => {
        const action = { type: '[Counter]', payload: true };
        const forBoolean = effectDispatcher(action.type + 'salt');
        const actions$: Observable<NgRxAction> = of(action);

        const observer = { next: () => ({}) };
        const observerSpy = jest.spyOn(observer, 'next');

        actions$.pipe(whereType(forBoolean)).subscribe(observer);
        expect(observerSpy).not.toBeCalled();
      });
    });

    describe('When multiple types are triggering an effect', () => {
      it('should pass the stream', () => {
        const actions = [
          { type: '[1]', payload: true },
          { type: '[2]', payload: true },
          { type: '[3]', payload: true }
        ];

        const forBoolean = effectDispatcher<boolean>(actions[0].type);
        const forString = effectDispatcher<string>(actions[1].type);
        const forNumber = effectDispatcher<number>(actions[2].type);

        const actions$: Observable<NgRxAction> = from(actions);

        const observer = { next: () => ({}) };
        const observerSpy = jest.spyOn(observer, 'next');

        actions$
          .pipe(whereType([forBoolean, forString, forNumber]))
          .subscribe(observer);

        expect(observerSpy).toBeCalledTimes(3);
      });
    });
  });

  describe('self dispatching action', () => {
    let storeMock: StoreMock<{}>;
    let duck: Duck<CuteDuck>;

    class CuteDuck {
      @Action('[Duck] Eat')
      eat(state: any, _payload: boolean): any {
        return state;
      }

      @Action('[Duck] Drink')
      drink(state: any, _payload: number): any {
        return state;
      }

      @Action('[Duck] Swim')
      swim(state: any, _payload: string): any {
        return state;
      }
    }

    beforeEach(() => {
      storeMock = new StoreMock({});
      duck = ducksify(CuteDuck, storeMock as any);
    });

    describe('When a type of the emitted action matches', () => {
      it('should pass the stream', done => {
        const action = { type: '[Duck] Eat', payload: true };

        const actions$: Observable<NgRxAction> = of(action);

        actions$.pipe(whereType(duck.eat)).subscribe({
          next: ({ payload }) => {
            expect(payload).toBe(true);
            done();
          }
        });
      });
    });

    describe('When a type of a emitted action does not match', () => {
      it('should not pass the stream', () => {
        const action = { type: '[Duck]', payload: true };
        const actions$: Observable<NgRxAction> = of(action);

        const observer = { next: () => ({}) };
        const observerSpy = jest.spyOn(observer, 'next');

        actions$.pipe(whereType(duck.eat)).subscribe(observer);
        expect(observerSpy).not.toBeCalled();
      });
    });

    describe('When multiple types are triggering an effect', () => {
      it('should pass the stream', () => {
        const actions = [
          { type: '[Duck] Eat', payload: true },
          { type: '[Duck] Drink', payload: 0 },
          { type: '[Duck] Swim', payload: 'nak, nak' }
        ];

        const actions$: Observable<NgRxAction> = from(actions);

        const observer = { next: () => ({}) };
        const observerSpy = jest.spyOn(observer, 'next');

        actions$
          .pipe(whereType([duck.eat, duck.drink, duck.swim]))
          .subscribe(observer);

        expect(observerSpy).toBeCalledTimes(3);
      });
    });
  });
});

function effectDispatcher<T>(type: string) {
  return {
    type,
    dispatch: (_payload: T) => ({})
  };
}
