import { createFeatureSelector, createSelector } from '@ngrx/store';
import { expecter } from 'ts-snippet';
import { bindSelectors } from './bind-selectors';

describe('bind-selectors', () => {
  const expectSnippet = expecter(
    code => `
      import { createFeatureSelector, createSelector } from '@ngrx/store';
      import { bindSelectors } from './src/bind-selectors';

      const feature = createFeatureSelector<number>('counter');
      ${code}
      `
  );

  describe('When a selector is passed', () => {
    it('yields a stream', () => {
      expectSnippet(`
        const selectorPlain = createSelector(feature, state => state);
        const { selectorPlain } = bindSelectors({ selectorPlain });
      `).toInfer('selectorPlain', 'Observable<number>');
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

    it.skip('foo', () => {
      const feature = createFeatureSelector<number>('counter');
      const selectorPlain = createSelector(
        feature,
        state => state
      );
      const selectorProperty = createSelector(
        selectorPlain,
        (state: number, props: { value: number }) => state + props.value
      );

      const select = bindSelectors({ selectorPlain, selectorProperty });
      console.log(
        (select as any).__ngrx_ducks__selectors_original.selectorPlain.projector.toString()
      );

      // selectorPlain: store.pipe(selectorProperty)
      // selectorProperty: (props: TProps) => store.pipe(selectorProperty, props)
    });
  });
});
