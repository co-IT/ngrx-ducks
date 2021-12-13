import { expecter } from 'ts-snippet';
import { NgRxDucksNotConnectedError } from '../create-duck/create-duck-not-connected.error';
import { compilerOptions } from '../utils';
import { usePick } from './use-pick';

describe('usePick', () => {
  const expectSnippet = expecter(
    (code) => `
      import { usePick } from '@ngrx-ducks/core';
      ${code}
      `,
    compilerOptions()
  );

  describe('When a property is initialized with usePick', () => {
    it('becomes a PickFunction', () => {
      expectSnippet(`
        const pick = usePick();
      `).toInfer('pick', 'PickFunction');
    });

    it('throws if it is used without @StoreFacade', () => {
      const pick = usePick();
      expect(() => pick({} as any)).toThrowError(
        new NgRxDucksNotConnectedError()
      );
    });
  });
});
