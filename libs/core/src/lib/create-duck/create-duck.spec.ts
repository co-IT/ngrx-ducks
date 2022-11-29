import { expecter } from 'ts-snippet';
import { compilerOptions } from '../utils';
import { createDuck } from './create-duck';
import { dispatch } from './dispatch';
import { NgRxDucksNotConnectedError } from './ngrx-ducks-not-connected.error';

describe('createDuck', () => {
  const expectSnippet = expecter(
    code => `
      import { of } from 'rxjs';
      import { map } from 'rxjs/operators';
      import { Actions, ofType } from '@ngrx/effects';
      import { createDuck, dispatch } from '@ngrx-ducks/core';
      ${code}
      `,
    compilerOptions()
  );

  describe('vanilla action', () => {
    it('provides an action creator', () => {
      expectSnippet(`
        const creator = createDuck('Hello');
      `).toInfer(
        'creator',
        '(() => TypedAction<"Hello">) & TypedAction<"Hello"> & DispatchPlain'
      );
    });

    it('provides a dispatch method', () => {
      expectSnippet(`
        const { dispatch:d } = createDuck('Hello');
      `).toInfer('d', '() => void');
    });

    it('throws if dispatch method is called', () => {
      /** dispatch only works after @StoreChunk connects it with the Store */
      const creator = createDuck('Hello');

      expect(() => creator.dispatch()).toThrowError(
        new NgRxDucksNotConnectedError('Hello')
      );
    });

    it('creates an action having a type', () => {
      const creator = createDuck('Hello');
      const action = creator();

      expect(action.type).toBe('Hello');
    });

    it('has no payload', () => {
      const creator = createDuck('Hello');
      const action = creator();

      expect((Object.keys(action) as any).payload).toBeUndefined();
    });
  });

  describe('action with payload', () => {
    it('allows declaring a payload type', () => {
      expectSnippet(`
        const creator = createDuck('Hello', dispatch<number>());
      `).toInfer(
        'creator',
        'FunctionWithParametersType<[number], { payload: number; } & TypedAction<"Hello">> & TypedAction<"Hello"> & DispatchLoaded<number>'
      );
    });

    it('has payload', () => {
      const creator = createDuck('Hello', dispatch<number>());
      const action = creator(42);

      expect(action.payload).toBe(42);
    });
  });

  describe('action with case reducer', () => {
    const expectSnippet = expecter(
      code => `
        import { createDuck } from '@ngrx-ducks/core';
        ${code}
        `,
      compilerOptions()
    );

    it('provides an action creator mutating state', () => {
      expectSnippet(`
        const creator = createDuck('Hello', (slice: number) => slice);
      `).toSucceed();
    });

    it('contains a hidden reducer', () => {
      const currentSlice = 0;
      const creator = createDuck('Hello', (slice: number) => slice);
      const nextSlice = (creator as any).reducer(currentSlice);

      expect(nextSlice).toBe(currentSlice);
    });

    it('fails if reducer has more than two arguments', () => {
      expectSnippet(`
        const creator = createDuck('Hello', (slice: number, payload: number, other: number) => slice);
      `).toFail();
    });

    it('fails if the return type is not equal to the slice parameter', () => {
      expectSnippet(`
        const creator = createDuck('Hello', (slice: number, payload: number) => '');
      `).toFail();
    });
  });

  describe('use with createEffect', () => {
    it('without payload => is compatible with ofType operator', () => {
      expectSnippet(`
        const incoming = createDuck('Hello');
        const outgoing = createDuck('Bye');
        const actions$ = of(incoming) as Actions;
        const result$ =  actions$.pipe(
          ofType(incoming),
          map(() => outgoing())
        );
      `).toInfer('result$', 'Observable<TypedAction<"Bye">>');
    });

    it('with payload => is compatible with ofType operator', () => {
      expectSnippet(`
        const incoming = createDuck('Hello', dispatch<number>());
        const outgoing = createDuck('Bye', dispatch<number>());
        const actions$ = of(incoming) as Actions;
        const result$ =  actions$.pipe(
          ofType(incoming),
          map(({ payload }) => outgoing(payload))
        );
      `).toInfer(
        'result$',
        'Observable<{ payload: number; } & TypedAction<"Bye">>'
      );
    });
  });
});
