import { expecter } from 'ts-snippet';
import { compilerOptions } from '../utils';

describe('use with createEffect', () => {
  const expectSnippet = expecter(
    (code) => `
      import { of } from 'rxjs';
      import { map } from 'rxjs/operators';
      import { Actions, ofType } from '@ngrx/effects';
      import { createDuck, dispatch, getActions } from '@ngrx-ducks/core';
      ${code}
      `,
    compilerOptions()
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
