import { expecter } from 'ts-snippet';
import { NgRxDucksNotConnectedError } from '../create-duck/ngrx-ducks-not-connected.error';
import { compilerOptions } from '../utils';
import { useSelect } from './use-select';

describe(useSelect.name, () => {
  const expectSnippet = expecter(
    code => `
      import { useSelect } from '@ngrx-ducks/core';
      ${code}
      `,
    compilerOptions()
  );

  describe('When a property is initialized with usePick', () => {
    it('becomes a SelectFunction', () => {
      expectSnippet(`
        const select = useSelect();
      `).toInfer('select', 'SelectFunction');
    });

    it('throws if it is used without @StoreChunk', () => {
      const select = useSelect();
      expect(() => select({} as any)).toThrowError(
        new NgRxDucksNotConnectedError()
      );
    });
  });
});
