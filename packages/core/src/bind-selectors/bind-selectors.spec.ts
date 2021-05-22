import { TestBed } from '@angular/core/testing';
import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { expecter } from 'ts-snippet';
import { NgRxDucksNotConnectedError } from '../create-duck/create-duck-not-connected.error';
import { bindSelectors } from './bind-selectors';
import { connectSelectorsToStore } from './connect-selectors-to-store';

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

  describe('When a selector stream is used', () => {
    it('throws an exception since @StoreFacade is needed to get it to work', done => {
      const feature = createFeatureSelector<number>('counter');
      const selector = createSelector(feature, state => state);

      const select = bindSelectors({ selector });

      select.selector.subscribe({
        error: err => {
          expect(err).toBeInstanceOf(NgRxDucksNotConnectedError);
          done();
        }
      });
    });
  });

  describe('When the Store is connected', () => {
    it('provides data in a stream', done => {
      TestBed.configureTestingModule({
        providers: [
          provideMockStore({ initialState: { counter: { count: 10 } } })
        ]
      });

      const store: Store<unknown> = TestBed.get(Store);
      const feature = createFeatureSelector<{ count: number }>('counter');
      const selectorCount = createSelector(feature, counter => counter.count);

      const selectors = bindSelectors({ selectorCount });
      connectSelectorsToStore(selectors, store);

      selectors.selectorCount.subscribe(count => {
        expect(count).toBe(10);
        done();
      });
    });
  });
});
