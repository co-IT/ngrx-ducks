import { expecter } from 'ts-snippet';

describe('use with createEffect', () => {
  const expectSnippet = expecter(
    code => `
      import { of } from 'rxjs';
      import { map } from 'rxjs/operators';
      import { Actions, ofType } from '@ngrx/effects';
      import { createDuck } from './src/create-duck/create-duck';
      import { dispatch } from './src/create-duck/dispatch';
      import { getActions } from './src/get-actions';
      ${code}
      `
  );

  it('without payload => is compatible with ofType operator', () => {
    expectSnippet(`
      class Facade {
        otherProperty = true;

        hello = createDuck('Hello');
        bye = createDuck('Bye', dispatch<boolean>());
      }

      const actions = getActions(Facade);

      const actions$ = of(actions.hello) as Actions;
      const result$ =  actions$.pipe(
        ofType(actions.hello),
        map(() => actions.hello())
      );
    `).toInfer('result$', 'Observable<TypedAction<"Hello">>');
  });

  it('with payload => is compatible with ofType operator', () => {
    expectSnippet(`
    class Facade {
      otherProperty = true;

      hello = createDuck('Hello');
      bye = createDuck('Bye', dispatch<boolean>());
    }

    const actions = getActions(Facade);

    const actions$ = of(actions.hello) as Actions;
    const result$ =  actions$.pipe(
      ofType(actions.hello),
      map(() => actions.bye(true))
    );
    `).toInfer(
      'result$',
      'Observable<{ payload: boolean; } & TypedAction<"Bye">>'
    );
  });
});
