import { TestBed } from '@angular/core/testing';
import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NgRxDucksNotConnectedError } from '../create-duck/create-duck-not-connected.error';
import { bindSelectors } from './bind-selectors';
import { connectSelectorsToStore } from './connect-selectors-to-store';

describe(bindSelectors.name, () => {
  const feature = createFeatureSelector<number>('counter');

  describe('Selector Plain', () => {
    describe('When a selector stream is used', () => {
      it('throws an exception since @StoreFacade is needed to get it to work', done => {
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

  describe('Selector Factory', () => {
    describe('When a selector gets parameters passed from a factory', () => {
      it('builds a function taking the parameter and providing a stream', done => {
        TestBed.configureTestingModule({
          providers: [
            provideMockStore({ initialState: { counter: { count: 10 } } })
          ]
        });

        const store = TestBed.inject(Store);

        const countWithOffset = (offset: number) => {
          return createSelector(feature, (state: any) => state.count + offset);
        };

        const selectors = bindSelectors({ countWithOffset });
        connectSelectorsToStore(selectors, store);

        selectors.countWithOffset(10).subscribe({
          next: count => {
            expect(count).toBe(20);
            done();
          }
        });
      });
    });
  });
});
