import { Action } from '@ngrx/store';
import { from, Observable, of } from 'rxjs';
import { effect } from '../ducks';
import { whereType } from './where-type';

describe('operators: whereType', () => {
  describe('When a type of a emitted action matches', () => {
    it('should pass the stream', done => {
      const action = { type: '[Counter]', payload: true };
      const booleanEffectDispatcher = effect<boolean>(action.type);
      const actions$: Observable<Action> = of(action);

      actions$.pipe(whereType(booleanEffectDispatcher)).subscribe({
        next: ({ payload }) => {
          expect(payload).toBe(true);
          done();
        }
      });
    });
  });

  describe('When a type of a emitted action does not match', () => {
    it('should not pass the stream', () => {
      const action = { type: '[Counter]', payload: true };
      const booleanEffectDispatcher = effect<boolean>(action.type + 'salt');
      const actions$: Observable<Action> = of(action);

      const observer = { next: () => ({}) };
      const observerSpy = jest.spyOn(observer, 'next');

      actions$.pipe(whereType(booleanEffectDispatcher)).subscribe(observer);
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

      const booleanDispatcher = effect<boolean>(actions[0].type);
      const stringDispatcher = effect<string>(actions[1].type);
      const numberDispatcher = effect<number>(actions[2].type);

      const actions$: Observable<Action> = from(actions);

      const observer = { next: () => ({}) };
      const observerSpy = jest.spyOn(observer, 'next');

      actions$
        .pipe(
          whereType([booleanDispatcher, stringDispatcher, numberDispatcher])
        )
        .subscribe(observer);

      expect(observerSpy).toBeCalledTimes(3);
    });
  });
});
