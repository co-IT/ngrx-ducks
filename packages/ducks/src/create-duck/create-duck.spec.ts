import { expecter } from 'ts-snippet';
import { createDuck } from './create-duck';

describe('createDuck', () => {
  describe('vanilla action', () => {
    const expectSnippet = expecter(
      code => `
        import { createDuck } from './src/create-duck/create-duck';
        ${code}
        `
    );

    it('provides an action creator', () => {
      expectSnippet(`
        const creator = createDuck('Hello');
      `).toInfer(
        'creator',
        'ActionCreator<"Hello", () => TypedAction<"Hello">>'
      );
    });

    it('allows declaring a payload type', () => {
      expectSnippet(`
        const creator = createDuck<number>('Hello');
      `).toInfer(
        'creator',
        'ActionCreator<string, (props: { payload: number; }) => { payload: number; } & TypedAction<string>>'
      );
    });
  });

  describe('action without payload', () => {
    it('creates an action having a type', () => {
      const creator = createDuck('Hello');
      const action = creator();

      expect(action.type).toBe('Hello');
    });

    it('has no payload', () => {
      const creator = createDuck('Hello');
      const action = creator();

      expect(Object.keys(action)).not.toContain('payload');
    });
  });

  describe('action with payload', () => {
    it('has payload', () => {
      const creator = createDuck<number>('Hello');
      const action = creator({ payload: 42 });

      expect(action.payload).toBe(42);
    });
  });

  describe('action with case reducer', () => {
    const expectSnippet = expecter(
      code => `
        import { createDuck } from './src/create-duck/create-duck';
        ${code}
        `
    );

    it('provides an action creator mutating state', () => {
      expectSnippet(`
        const creator = createDuck('Hello', (slice: number) => slice);
      `).toSucceed();
    });

    it('contains a case reducer', () => {
      const currentSlice = 0;
      const creator = createDuck('Hello', (slice: number) => slice);
      const nextSlice = creator.runCaseReducer(currentSlice);

      expect(nextSlice).toBe(currentSlice);
    });

    it('restrict the case reducer to two arguments', () => {
      expectSnippet(`
        const creator = createDuck('Hello', (slice: number, payload: number, other: number) => slice);
      `).toFail();
    });
  });

  describe('use with createEffect', () => {
    const expectSnippet = expecter(
      code => `
        import { of } from 'rxjs';
        import { map } from 'rxjs/operators';
        import { Actions, ofType } from '@ngrx/effects';
        import { createDuck } from './src/create-duck/create-duck';
        ${code}
        `
    );

    it('is compatible with ofType operator', () => {
      expectSnippet(`
        const incoming = createDuck<number>('Hello');
        const outgoing = createDuck<number>('Bye');
        const actions$ = of(incoming) as Actions;
        const result$ =  actions$.pipe(
          ofType(incoming),
          map(({ payload }) => outgoing({ payload }))
        );
      `).toInfer(
        'result$',
        'Observable<{ payload: number; } & TypedAction<string>>'
      );
    });
  });
});
