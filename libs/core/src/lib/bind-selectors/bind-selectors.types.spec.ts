import { expecter } from 'ts-snippet';
import { compilerOptions } from '../utils';
import { bindSelectors } from './bind-selectors';

describe(bindSelectors.name, () => {
  const expectSnippet = expecter(
    (code) => `
      import { createFeatureSelector, createSelector } from '@ngrx/store';
      import { bindSelectors } from '@ngrx-ducks/core';

      const feature = createFeatureSelector<number>('counter');
      ${code}
      `,
    compilerOptions()
  );

  describe('When a selector is passed', () => {
    it('yields a stream', () => {
      expectSnippet(`
        const selectorPlain = createSelector(feature, state => state);
        const { selectorPlain:result } = bindSelectors({ selectorPlain });
      `).toInfer('result', 'Observable<number>');
    });
  });

  describe('When a selector taking a parameter is passed', () => {
    it('fails', () => {
      expectSnippet(`
        const some = createSelector(feature, state => state);
        const selectorProperty = createSelector(some, (s, p: number) => 1);

        const { selectorProperty: s } = bindSelectors({ selectorProperty });
      `).toFail();
    });
  });
});
