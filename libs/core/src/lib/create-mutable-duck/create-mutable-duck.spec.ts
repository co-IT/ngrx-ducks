import { expecter } from 'ts-snippet';
import { compilerOptions } from '../utils';
import { createMutableDuck } from './create-mutable-duck';
describe(createMutableDuck.name, () => {
  const expectSnippet = expecter(
    (code) => `
      import { createMutableDuck, dispatch } from '@ngrx-ducks/core';
      ${code}
      `,
    compilerOptions()
  );

  describe('When a mutable duck is created', () => {
    it('can be created with a type only', () => {
      const duck = createMutableDuck('Hello');

      expect(duck.type).toBe('Hello');
    });

    it('can be created with a dispatch definition', () => {
      expectSnippet(`
        const duck = createMutableDuck('Hello', dispatch<number>());
      `).toInfer(
        'duck',
        'FunctionWithParametersType<[number], { payload: number; } & TypedAction<"Hello">> & TypedAction<"Hello"> & DispatchLoaded<number>'
      );
    });
  });
});
